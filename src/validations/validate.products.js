const { productsModel } = require('../models');
const schema = require('./joi.schemas');

// const validateProduct = (prod) => {
//   // Ignorei talvez n use
// };

const validateSaleQuantity = (sales) => {
  const { error } = schema.validNewSale.validate(sales);
  if (error) {
    return { type: 'INVALID_INPUT', message: '"quantity" must be greater than or equal to 1' };
  }
  return { type: null, message: '' };
};

const validateProducts = async (sales) => {
  const validProductsOnDB = sales.map(async ({ productId }) => {
    const product = await productsModel.getById(productId);
    if (!product) return { type: 'PRODUCT_NOT_FOUND' };
    return { type: null };
  });

  const validProd = await Promise.all(validProductsOnDB);

  if (validProd.some(({ type }) => type)) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }

  return { type: null };
};

module.exports = {
  validateSaleQuantity,
  validateProducts,
};