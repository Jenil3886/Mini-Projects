import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, sequelize } from './config/db.js';
import './models/User.js';
import './models/Todo.js';
import authRoutes from './routes/auth.js';
import todoRoutes from './routes/todos.js';

dotenv.config();

const app = express();
app.use(cors({ origin: '*', credentials: false }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  // Sync models (for demo). In production, use migrations.
  await sequelize.sync({ alter: false });
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})();
