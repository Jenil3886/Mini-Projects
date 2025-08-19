import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const auth = (roles = []) => (req, res, next) => {
  try {
    const token = (req.headers.authorization || '').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = payload;
    if (roles.length && !roles.includes(payload.role)) return res.status(403).json({ message: 'Forbidden' });
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
