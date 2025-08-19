import { Router } from 'express';
import Project from '../models/Project.js';
import Task from '../models/Task.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

// Create project
router.post('/', authRequired, async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Name required' });
    const project = await Project.create({ name, description });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// List projects
router.get('/', authRequired, async (req, res) => {
  try {
    const projects = await Project.findAll({ order: [['createdAt','DESC']] });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get project with tasks (with filtering/sorting)
// Query params: status, assigneeId, sortBy (dueDate/createdAt), order (asc/desc)
router.get('/:id', authRequired, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status, assigneeId, sortBy='createdAt', order='desc' } = req.query;
    const where = { projectId: id };
    if (status) where.status = status;
    if (assigneeId) where.assigneeId = assigneeId;

    const tasks = await Task.findAll({
      where,
      order: [[sortBy, order.toUpperCase()]],
      include: [{ model: (await import('../models/User.js')).default, as: 'assignee', attributes: ['id','name','email'] }]
    });

    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    res.json({ project, tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
