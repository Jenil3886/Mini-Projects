import { sequelize } from '../config/db.js';
import { DataTypes } from 'sequelize';
import UserModel from './User.js';
import ProductModel from './Product.js';
import OrderModel from './Order.js';
import OrderItemModel from './OrderItem.js';

export const User = UserModel(sequelize, DataTypes);
export const Product = ProductModel(sequelize, DataTypes);
export const Order = OrderModel(sequelize, DataTypes);
export const OrderItem = OrderItemModel(sequelize, DataTypes);

// associations
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

OrderItem.belongsTo(Product, { foreignKey: 'product_id' });
Product.hasMany(OrderItem, { foreignKey: 'product_id' });

export const models = { User, Product, Order, OrderItem };
