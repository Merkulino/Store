const { salesModel } = require('../models');
const { validateSaleQuantity,
        validateProducts,
        validSaleOnDB } = require('../validations/validate.products');

const newSale = async (sales) => {
  const error = validateSaleQuantity(sales);
  if (error.type) return error;

  const notHaveProductOnDB = await validateProducts(sales);
  if (notHaveProductOnDB.type) return notHaveProductOnDB;
    
  const res = await salesModel.newSale(sales);

  return { type: null, message: res };
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  if (!sales) return { type: 'SERVER_ERROR', message: 'Cannot get sales' };
  return { type: null, message: sales };
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  console.log(sale);
  if (!sale) return { type: 'NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sale };
};

const updateSale = async (id, sale) => {
  // const error = validateSaleQuantity(sale);
  // if (error.type) return error;

  // const notHaveProductOnDB = await validateProducts(sale);
  // if (notHaveProductOnDB.type) return notHaveProductOnDB;

  const notHaveSaleOnDB = await validSaleOnDB(id);
  if (notHaveSaleOnDB.type) return notHaveSaleOnDB;

  const saleUpdated = await salesModel.updateSale(id, sale);
  if (!saleUpdated) return { type: 'SERVER_ERROR', message: saleUpdated };
  return { type: null, message: saleUpdated };
};

const deleteSale = async (id) => {
  const notHaveSaleOnDB = await validSaleOnDB(id);
  if (notHaveSaleOnDB.type) return notHaveSaleOnDB;
  
  const saleDeleted = await salesModel.deleteSale(id);
  if (!saleDeleted) return { type: 'SERVER_ERROR', message: saleDeleted };
  return { type: null, message: 'ok' };
};

module.exports = {
  newSale,
  getAll,
  getById,
  updateSale,
  deleteSale,
};