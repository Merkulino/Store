const { productsModel, salesModel } = require('../models');
const schema = require('./joi.schemas');

const validateSaleQuantity = (sales) => {
  const { error } = schema.validNewSale.validate(sales);
  if (error) {
    return { type: 'INVALID_INPUT', message: '"quantity" must be greater than or equal to 1' };
  }
  return { type: null, message: '' };
};

const validateProductInputs = (product) => {
  const { error } = schema.validateNewProduct.validate(product);
  if (error) {
    return { type: 'INVALID_INPUT', message: error.message };
  }
  return { type: null, message: '' };
};

const verifyProductOnDB = async (productId) => {
  const product = await productsModel.getById(productId);
  if (!product) return { type: 'NOT_FOUND', message: 'Product not found' };
  return { type: null };
};

const validateProducts = async (sales) => {
  const validProductsOnDB = sales.map(async ({ productId }) => verifyProductOnDB(productId));

  const validProd = await Promise.all(validProductsOnDB);

  if (validProd.some(({ type }) => type)) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }

  return { type: null };
};

const validSaleOnDB = async (saleID) => {
  const hasSale = await salesModel.getById(saleID); 
  if (!hasSale || !hasSale.length) return { type: 'NOT_FOUND', message: 'Sale not found' };
  return { type: null };
};

module.exports = {
  validateSaleQuantity,
  validateProducts,
  verifyProductOnDB,
  validSaleOnDB,
  validateProductInputs,
};