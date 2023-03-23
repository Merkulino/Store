const { productsModel } = require('../models');
const { verifyProductOnDB } = require('../validations/validate.products');
// const validation = require('../validations/joi.schemas');

const getAll = async () => {
  const products = await productsModel.getAll();
  if (!products) return { type: 'SERVER ERROR', message: 'Cannot get products' };
  return { type: null, message: products };
};

const getById = async (id) => {
  // const error = validation.validateID(id);
  // if(error) return error;
  const product = await productsModel.getById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: product };
};

const newProduct = async (productData) => {
  // const { error } = validation.validateNewProduct.validate({ name: productData });
  // if (error) return { type: 'INVALID_VALUES', message: error.message };

  const productID = await productsModel.newProduct(productData);
  const productObj = await productsModel.getById(productID);
  
  return { type: null, message: productObj };
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

module.exports = {
  getAll,
  getById,
  newProduct,
  updateProduct,
  deleteProduct,
};