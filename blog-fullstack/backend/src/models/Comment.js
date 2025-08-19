import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Comment = sequelize.define('Comment', {
    content: { type: DataTypes.TEXT, allowNull: false },
  }, { tableName: 'comments', underscored: true, timestamps: true });

  return Comment;
};
