import { Order, OrderItem, Product } from '../models/index.js';

export const myOrders = async (req, res) => {
  const orders = await Order.findAll({
    where: { user_id: req.user.id, status: ['paid','cancelled'] },
    include: { model: OrderItem, as: 'items', include: [Product] },
    order: [['created_at','DESC']]
  });
  res.json(orders);
};
