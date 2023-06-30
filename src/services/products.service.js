const { productsModel } = require('../models');
const { verifyProductOnDB, validateProductInputs } = require('../validations/validate.products');

const getAll = async () => {
  const products = await productsModel.getAll();
  if (!products) return { type: 'SERVER ERROR', message: 'Cannot get products' };
  return { type: null, message: products };
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

const newProduct = async (productData) => {
  const error = validateProductInputs(productData);
  if (error.type) return error;

  const product = await productsModel.newProduct(productData);
  if (!product) return { type: 'CONFLICT', message: 'Was not possible add new product' };
  return { type: null, message: product };
};

const updateProduct = async (id, product) => {
  const error = await verifyProductOnDB(id);
  if (error.type) return { type: error.type, message: error.message };
  const productUpdated = await productsModel.updateProduct(id, product);
  if (!productUpdated) return { type: 'SERVER_ERROR', message: productUpdated };
  return { type: null, message: productUpdated };
};

const deleteProduct = async (id) => {
  const error = await verifyProductOnDB(id);
  if (error.type) return { type: error.type, message: error.message };
  const productDeleted = await productsModel.deleteProduct(id);
  if (!productDeleted) return { type: 'SERVER_ERROR', message: productDeleted };
  return { type: null, message: 'ok' };
};

const searchProduct = async (term) => {
  const objSearch = await productsModel.searchProduct(term);
  if (!objSearch) return { type: 'NOT_FOUND', message: 'Search not found' };
  return { type: null, message: objSearch };
};

module.exports = {
  getAll,
  getById,
  newProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};