import { Router } from 'express';
import Task from '../models/Task.js';
import Project from '../models/Project.js';
import User from '../models/User.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

// Create task inside a project
router.post('/', authRequired, async (req, res) => {
  try {
    const { projectId, title, description, assigneeId, dueDate } = req.body;
    if (!projectId || !title) return res.status(400).json({ message: 'projectId and title required' });
    const project = await Project.findByPk(projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Optionally validate assignee
    if (assigneeId) {
      const u = await User.findByPk(assigneeId);
      if (!u) return res.status(404).json({ message: 'Assignee not found' });
    }

    const task = await Task.create({ projectId, title, description, assigneeId: assigneeId || null, dueDate: dueDate || null });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update task (title, description, status, assignee)
router.put('/:id', authRequired, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const { title, description, status, assigneeId, dueDate } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) {
      if (!['todo','in_progress','done'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
      task.status = status;
    }
    if (assigneeId !== undefined) task.assigneeId = assigneeId;
    if (dueDate !== undefined) task.dueDate = dueDate;

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete task
router.delete('/:id', authRequired, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await task.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
