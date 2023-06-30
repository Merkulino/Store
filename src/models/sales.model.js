// const { snakefy } = require('snakelize');
const { SalesModel: db, ProductModel: dbProd } = require('./databaseODM');

const newSale = async (sale) => {
  try { // Not working x.x
    const newSalesProducts = sale.map(async ({ productId, quantity }) => {
      const currProduct = await dbProd.findOne({ _id: productId });
      const name = currProduct.name.toString();
      await db.create({ productName: name, quantity });
    });

    await Promise.all(newSalesProducts);
  } catch (e) {
    return undefined;
  }
  return { itemsSold: sale };
};

const getAll = async () => db.find();

const getById = async (id) => {
  try {
    const response = await db.findById(id);
    return response;
  } catch (error) {
    return undefined;
  }
};

const updateSale = async (id, { quantity }) => db.findOneAndUpdate({ _id: id }, { quantity })
  .then(() => ({ saleId: id, itemsUpdated: quantity }))
  .catch((error) => error);

const deleteSale = async (id) => {
  try {
    await db.findByIdAndRemove({ _id: id });
    return 'ok';
  } catch (error) {
    return undefined;
  }
};

module.exports = {
  newSale,
  getAll,
  getById,
  updateSale,
  deleteSale,
};