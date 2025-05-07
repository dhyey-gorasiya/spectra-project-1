const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Title is required' },
      len: {
        args: [2, 100],
        msg: 'Title must be between 2 and 100 characters',
      },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Description is required' },
      len: {
        args: [10, 1000],
        msg: 'Description must be between 10 and 1000 characters',
      },
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: { msg: 'Price must be a valid decimal number' },
      min: {
        args: [0],
        msg: 'Price must be greater than 0',
      },
    },
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'Quantity must be an integer' },
      min: {
        args: [0],
        msg: 'Quantity must be greater than 0',
      },
    },
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Image URL is required' },
      isUrl: { msg: 'Image URL must be a valid URL' },
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: { msg: 'User ID must be an integer' },
    },
  },
}, {
  timestamps: true,
});

module.exports = Product;
