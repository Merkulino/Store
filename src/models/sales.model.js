// const { snakefy } = require('snakelize');
const db = require('./db.connection');

const newSale = async (sale) => {
  const [{ insertId }] = await db.execute('INSERT INTO sales (date) VALUES (NOW())');
  try {
    const newSalesProducts = sale.map(async ({ productId, quantity }) => {
      await db.execute(
        `INSERT INTO sales_products (sale_id, product_id, quantity) VALUES
    (?, ?, ?)`,
        [insertId, productId, quantity],
      );
    });

    await Promise.all(newSalesProducts);
  } catch (e) {
    return undefined;
  }
  return { id: insertId, itemsSold: sale };
};

module.exports = {
  newSale,
};