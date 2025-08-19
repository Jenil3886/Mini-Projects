import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class Project extends Model {}

Project.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
  },
  { sequelize, modelName: 'Project', tableName: 'projects' }
);

export default Project;
