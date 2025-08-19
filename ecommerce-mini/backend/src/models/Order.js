export default (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    status: { type: DataTypes.STRING, defaultValue: 'cart' },
    total: { type: DataTypes.DECIMAL(10,2), defaultValue: 0.00 }
  }, { tableName: 'orders', underscored: true });
  return Order;
};
