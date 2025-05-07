const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model');
db.Product = require('./product.model');

db.User.hasMany(db.Product, { foreignKey: 'userId', as: 'products' });
db.Product.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });

module.exports = db;
