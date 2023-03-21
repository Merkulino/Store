const { productsModel } = require('../models');

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
  // const error = validation.validateProduct(productData);
  // if(error) return error;

  const productID = await productsModel.newProduct(productData);
  const productObj = await productsModel.getById(productID);
  
  // if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  return { type: null, message: productObj };
};

module.exports = {
  getAll,
  getById,
  newProduct,
};