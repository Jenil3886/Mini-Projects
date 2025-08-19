import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Post = sequelize.define('Post', {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
  }, { tableName: 'posts', underscored: true, timestamps: true });

  return Post;
};
