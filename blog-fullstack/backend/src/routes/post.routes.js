import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { isAdminOrOwner } from '../middlewares/isAdminOrOwner.js';
import { createPost, listPosts, getPostById, updatePost, deletePost } from '../controllers/post.controller.js';
import { Post } from '../models/index.js';

const r = Router();

r.get('/', listPosts);
r.get('/:id', getPostById);
r.post('/', auth, createPost);
r.put('/:id', auth, isAdminOrOwner(async (req) => {
  const p = await Post.findByPk(req.params.id); if (!p) throw new Error(); return p.user_id;
}), updatePost);
r.delete('/:id', auth, isAdminOrOwner(async (req) => {
  const p = await Post.findByPk(req.params.id); if (!p) throw new Error(); return p.user_id;
}), deletePost);

export default r;
