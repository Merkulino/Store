const express = require('express');
require('express-async-errors');
const { productsRouter, salesRouter } = require('./routes');

const app = express();

app.use(express.json());

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
  next();
});

module.exports = app;