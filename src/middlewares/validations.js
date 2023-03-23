const schema = require('../validations/joi.schemas');

const validProductName = (req, res, next) => {
  const { name } = req.body;
  if (!name) next({ status: 400, message: '"name" is required' });
  next();
};

const newProduct = (req, res, next) => {
  const product = req.body;
  if (!product.name) return res.status(400).json({ message: '"name" is required' });
  const { error } = schema.validateNewProduct.validate(product); // Refactor colocar essa validação na service e usar a funcão para validar campo name
  if (error) {
    return next({ status: 422, message: error.message });
  }
  next();
};

const newSale = (req, res, next) => {
  const products = req.body;
  products.forEach(({ productId, quantity }) => {
    if (!productId) next({ status: 400, message: '"productId" is required' });
    if (quantity === undefined) next({ status: 400, message: '"quantity" is required' });
  }); 
  next();
};

module.exports = {
  newProduct,
  newSale,
  validProductName,
};