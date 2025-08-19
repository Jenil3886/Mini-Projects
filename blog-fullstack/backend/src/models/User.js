import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export default (sequelize) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('user','admin'), defaultValue: 'user' },
  }, { tableName: 'users', underscored: true, timestamps: true });

  User.beforeCreate(async (user) => {
    const rounds = Number(process.env.BCRYPT_ROUNDS || 10);
    user.password = await bcrypt.hash(user.password, rounds);
  });

  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      const rounds = Number(process.env.BCRYPT_ROUNDS || 10);
      user.password = await bcrypt.hash(user.password, rounds);
    }
  });

  User.prototype.comparePassword = function (plain) {
    return bcrypt.compare(plain, this.password);
  };

  return User;
};
