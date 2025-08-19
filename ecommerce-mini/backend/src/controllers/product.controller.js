import { Product } from '../models/index.js';
import { Op } from 'sequelize';

export const listProducts = async (req, res) => {
  const { q, category, page = 1, limit = 12 } = req.query;
  const where = {};
  if (q) where.title = { [Op.substring]: q };
  if (category) where.category = category;
  const offset = (Number(page) -1) * Number(limit);
  const { rows, count } = await Product.findAndCountAll({ where, limit: Number(limit), offset, order: [['created_at','DESC']] });
  res.json({ data: rows, total: count, page: Number(page), pages: Math.ceil(count/Number(limit)) });
};

export const getProduct = async (req, res) => {
  const p = await Product.findByPk(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  res.json(p);
};

export const createProduct = async (req, res) => {
  const p = await Product.create(req.body);
  res.status(201).json(p);
};

export const updateProduct = async (req, res) => {
  const p = await Product.findByPk(req.params.id);
  if (!p) return res.status(404).json({ message: 'Not found' });
  await p.update(req.body);
  res.json(p);
};

export const deleteProduct = async (req, res) => {
  await Product.destroy({ where: { id: req.params.id }});
  res.json({ ok: true });
};
