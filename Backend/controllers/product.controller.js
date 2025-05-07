const { Product } = require('../models');
const { Op } = require('sequelize');

exports.create = async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, userId: req.user.id });
    res.status(201).json(product);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Validation failed',
        errors: err.errors.map(e => e.message),
      });
    }
    res.status(500).json({ error: err.message });
  }
};


exports.getAll = async (req, res) => {
  try {
    const { 
      page = 1, 
      size = 3, 
      search = '', 
      sort = 'createdAt', 
      order = 'ASC' 
    } = req.query;
    const offset = (page - 1) * size;
    const { count, rows } = await Product.findAndCountAll({
      where: {
        userId: req.user.id,
        title: { [Op.like]: `%${search}%` },
      },
      limit: +size,
      offset,
      order: [[sort, order]]
    });
    res.json({ totalItems: count, products: rows, totalPages: Math.ceil(count / size), currentPage: +page });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  const product = await Product.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
};

exports.update = async (req, res) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.update(req.body);
    res.status(200).json(product);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        message: 'Validation failed',
        errors: err.errors.map(e => e.message),
      });
    }
    res.status(500).json({ error: err.message });
  }
};


exports.delete = async (req, res) => {
  await Product.destroy({ where: { id: req.params.id, userId: req.user.id } });
  res.status(204).end();
};
