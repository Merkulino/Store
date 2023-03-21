const schema = require('../validations/joi.schemas');

const newProduct = (req, res, next) => {
  const product = req.body;
  if (!product.name) res.status(400).json({ message: '"name" is required' });
  const { error } = schema.validateNewProduct.validate(product);
  if (error) {
    return next({ status: 422, message: error.message });
  }
  next();
};

module.exports = {
  newProduct,
};