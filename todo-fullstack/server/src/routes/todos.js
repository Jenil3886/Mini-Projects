import { Router } from 'express';
import Todo from '../models/Todo.js';
import { authRequired } from '../middleware/auth.js';
import { Op } from 'sequelize';

const router = Router();

// Create
router.post('/', authRequired, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const todo = await Todo.create({ title, description, userId: req.user.id });
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read (with pagination + search + filter)
// Query: ?page=1&limit=10&search=abc&completed=true
router.get('/', authRequired, async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const offset = (page - 1) * limit;
    const search = (req.query.search || '').trim();
    const completed = req.query.completed;

    const dynamicWhere = { userId: req.user.id };
    if (search) dynamicWhere.title = { [Op.iLike]: `%${search}%` }; // iLike for Postgres
    if (completed === 'true') dynamicWhere.completed = true;
    if (completed === 'false') dynamicWhere.completed = false;

    const { rows, count } = await Todo.findAndCountAll({
      where: dynamicWhere,
      order: [['createdAt', 'DESC']],
      limit,
      offset,
    });

    res.json({
      data: rows,
      page,
      total: count,
      totalPages: Math.ceil(count / limit),
      limit,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update (title/description/completed)
router.put('/:id', authRequired, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todo = await Todo.findOne({ where: { id, userId: req.user.id } });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    const { title, description, completed } = req.body;
    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;

    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete
router.delete('/:id', authRequired, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todo = await Todo.findOne({ where: { id, userId: req.user.id } });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    await todo.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
