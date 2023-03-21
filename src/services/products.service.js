const { productsModel } = require('../models');
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

module.exports = {
  getAll,
  getById,
  newProduct,
};