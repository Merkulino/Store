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

const newSale = (req, res, next) => {
  const products = req.body;
  products.forEach(({ productId, quantity }) => { // Acho que pode dar error de Type caso não tenha essas chaves
    if (!productId) next({ status: 400, message: '"productId" is required' });
    if (quantity === undefined) next({ status: 400, message: '"quantity" is required' });
  }); 
  next();
};

module.exports = {
  newProduct,
  newSale,
};