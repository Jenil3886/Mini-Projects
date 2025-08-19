import { Comment, Post, User } from '../models/index.js';

export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;
    if (!content) return res.status(400).json({ message: 'content required' });

    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = await Comment.create({ content, post_id: postId, user_id: req.user.id });
    res.status(201).json(comment);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Add comment failed' });
  }
};

export const listComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.findAll({
      where: { post_id: postId },
      include: [{ model: User, attributes: ['id','name'] }],
      order: [['created_at','ASC']],
    });
    res.json(comments);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'List comments failed' });
  }
};
