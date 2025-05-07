const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(process.env.PORT);
});