const db = require('./db.connection');

const getAll = async () => {
  const [products] = await db.execute('SELECT * FROM products');
  return products;
};

const getById = async (id) => {
  const [[products]] = await db.execute(`
  SELECT * FROM products
  WHERE id = ?
  ORDER BY id ASC`, [id]);

  return products;
};

module.exports = {
  getAll,
  getById,
};