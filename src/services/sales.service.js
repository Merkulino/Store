const { salesModel } = require('../models');
const { validateSaleQuantity, validateProducts } = require('../validations/validate.products');

const newSale = async (sales) => {
  const error = validateSaleQuantity(sales);
  if (error.type) return error;

  const notHaveProductOnDB = await validateProducts(sales);
  if (notHaveProductOnDB.type) return notHaveProductOnDB;
    
  const res = await salesModel.newSale(sales);
  if (res === undefined) {
    return { type: 'DATABASE_ERROR', message: 'Erro ao adicionar venda ao banco' };
  }

  return { type: null, message: res };
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  if (!sales) return { type: 'SERVER_ERROR', message: 'Cannot get sales' };
  return { type: null, message: sales };
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (!sale || !sale.length) return { type: 'NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: sale };
};

module.exports = {
  newSale,
  getAll,
  getById,
};