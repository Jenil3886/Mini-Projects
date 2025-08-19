export default (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
    unitPrice: { type: DataTypes.DECIMAL(10,2), field: 'unit_price' }
  }, { tableName: 'order_items', underscored: true });
  return OrderItem;
};
