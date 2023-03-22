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

module.exports = {
  newSale,
};