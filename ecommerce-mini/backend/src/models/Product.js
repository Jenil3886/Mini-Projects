export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(10,2),
    category: DataTypes.STRING,
    imageUrl: { type: DataTypes.TEXT, field: 'image_url' },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, { tableName: 'products', underscored: true });
  return Product;
};
