import { Order, OrderItem, Product } from '../models/index.js';
import { sequelize } from '../config/db.js';

const getOrCreateCart = async (userId) => {
  let cart = await Order.findOne({ where: { user_id: userId, status: 'cart' }});
  if (!cart) cart = await Order.create({ user_id: userId, status: 'cart', total: 0 });
  return cart;
};

export const getCart = async (req, res) => {
  const cart = await getOrCreateCart(req.user.id);
  const withItems = await Order.findByPk(cart.id, { include: { model: OrderItem, as: 'items', include: [Product] }});
  res.json(withItems);
};

export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const cart = await getOrCreateCart(req.user.id);
  const product = await Product.findByPk(productId);
  if (!product || product.stock < quantity) return res.status(400).json({ message: 'Insufficient stock' });
  const [item, created] = await OrderItem.findOrCreate({
    where: { order_id: cart.id, product_id: productId },
    defaults: { quantity, unitPrice: product.price }
  });
  if (!created) {
    item.quantity += quantity;
    await item.save();
  }
  const items = await OrderItem.findAll({ where: { order_id: cart.id }});
  const total = items.reduce((s, it) => s + Number(it.unitPrice) * it.quantity, 0);
  await cart.update({ total });
  res.json(await Order.findByPk(cart.id, { include: { model: OrderItem, as: 'items', include: [Product] }}));
};

export const updateCartItem = async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await getOrCreateCart(req.user.id);
  const item = await OrderItem.findOne({ where: { order_id: cart.id, product_id: productId }});
  if (!item) return res.status(404).json({ message: 'Item not in cart' });
  if (quantity <= 0) await item.destroy(); else { item.quantity = quantity; await item.save(); }
  const items = await OrderItem.findAll({ where: { order_id: cart.id }});
  const total = items.reduce((s, it) => s + Number(it.unitPrice) * it.quantity, 0);
  await cart.update({ total });
  res.json(await Order.findByPk(cart.id, { include: { model: OrderItem, as: 'items', include: [Product] }}));
};

export const checkout = async (req, res) => {
  try {
    await sequelize.transaction(async (t) => {
      const cart = await Order.findOne({ where: { user_id: req.user.id, status: 'cart' }, transaction: t, lock: t.LOCK.UPDATE });
      if (!cart) throw new Error('No cart');
      const items = await OrderItem.findAll({ where: { order_id: cart.id }, transaction: t });
      if (!items.length) throw new Error('Cart is empty');
      for (const it of items) {
        const p = await Product.findByPk(it.product_id, { transaction: t, lock: t.LOCK.UPDATE });
        if (p.stock < it.quantity) throw new Error(`Stock not enough for ${p.title}`);
        p.stock -= it.quantity; await p.save({ transaction: t });
      }
      cart.status = 'paid';
      await cart.save({ transaction: t });
    });
    res.json({ ok: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
