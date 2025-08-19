import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite::memory:';

export const sequelize = new Sequelize(DATABASE_URL, {
  logging: false
});
