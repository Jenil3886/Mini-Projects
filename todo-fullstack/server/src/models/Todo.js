import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './User.js';

class Todo extends Model {}

Todo.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { sequelize, modelName: 'Todo', tableName: 'todos' }
);

User.hasMany(Todo, { foreignKey: 'userId', onDelete: 'CASCADE' });
Todo.belongsTo(User, { foreignKey: 'userId' });

export default Todo;
