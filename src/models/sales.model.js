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

const getAll = async () => {
  const [sales] = await db.execute(`
  SELECT sale_id, date, product_id,quantity
  FROM sales AS s
  INNER JOIN sales_products AS sp 
  ON s.id = sp.sale_id
  ORDER BY sale_id ASC, product_id;`);
  
  const salesNormalized = sales.map((sale) => ({ // Refactor -> Camelize
    saleId: sale.sale_id,
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));
  
  return salesNormalized;
};

const getById = async (id) => {
  const [sales] = await db.execute(`
  SELECT date, product_id, quantity
  FROM sales as s
  INNER JOIN sales_products as sp 
  ON s.id = sp.sale_id
  WHERE sale_id = ?
  ORDER BY sale_id ASC, product_id;`, [id]);

  const salesNormalized = sales.map((sale) => ({ // Refactor -> Camelize
    date: sale.date,
    productId: sale.product_id,
    quantity: sale.quantity,
  }));

  return salesNormalized;
};

module.exports = {
  newSale,
  getAll,
  getById,
};