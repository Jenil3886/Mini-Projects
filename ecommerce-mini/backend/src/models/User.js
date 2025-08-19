export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    passwordHash: { type: DataTypes.STRING, field: 'password_hash' },
    role: { type: DataTypes.STRING, defaultValue: 'user' }
  }, { tableName: 'users', underscored: true });
  return User;
};
