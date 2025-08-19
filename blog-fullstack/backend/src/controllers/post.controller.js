import { Post, User } from '../models/index.js';

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'title & content required' });
    const post = await Post.create({ title, content, user_id: req.user.id });
    res.status(201).json(post);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Create post failed' });
  }
};

export const listPosts = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page || '1'));
    const limit = Math.max(1, Math.min(50, parseInt(req.query.limit || '10')));
    const offset = (page - 1) * limit;

    const { count, rows } = await Post.findAndCountAll({
      include: [{ model: User, attributes: ['id','name'] }],
      order: [['created_at','DESC']],
      limit,
      offset
    });

    res.json({
      data: rows,
      meta: { total: count, page, limit, pages: Math.ceil(count / limit) }
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'List posts failed' });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['id','name'] }]
    });
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json(post);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Get post failed' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    await post.update({ title: req.body.title ?? post.title, content: req.body.content ?? post.content });
    res.json(post);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Update failed' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    await post.destroy();
    res.json({ message: 'Deleted' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Delete failed' });
  }
};
