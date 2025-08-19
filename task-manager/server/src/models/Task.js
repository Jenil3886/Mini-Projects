import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';
import Project from './Project.js';
import User from './User.js';

class Task extends Model {}

Task.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    status: { type: DataTypes.ENUM('todo','in_progress','done'), defaultValue: 'todo' },
    dueDate: { type: DataTypes.DATE, allowNull: true },
  },
  { sequelize, modelName: 'Task', tableName: 'tasks' }
);

// Associations
Project.hasMany(Task, { foreignKey: 'projectId', onDelete: 'CASCADE' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

User.hasMany(Task, { foreignKey: 'assigneeId' });
Task.belongsTo(User, { foreignKey: 'assigneeId', as: 'assignee' });

export default Task;
