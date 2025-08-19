import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { addComment, listComments } from '../controllers/comment.controller.js';

const r = Router();
r.get('/:postId', listComments);
r.post('/:postId', auth, addComment);
export default r;
