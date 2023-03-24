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

const newProduct = async (productData) => {
  const [{ insertId }] = await db.execute(`
  INSERT INTO products (name) VALUES (?)`, [productData]);

  return insertId;
};

const updateProduct = async (id, { name }) => {
  await db.execute(`
    UPDATE products
    SET name = ?
    WHERE id = ?`, [name, id]);
  const [[{ name: nome }]] = await db.execute(`
  SELECT name FROM products WHERE id = ?`, [id]);
  return { id, name: nome };
};

const deleteProduct = async (id) => {
  const [response] = await db.execute('DELETE FROM products WHERE id = ?', [id]);
  if (!response.affectedRows > 0) return undefined;
  return 'ok';
};

const searchProduct = async (term) => {
  const sqlQuery = `SELECT * FROM products WHERE name LIKE '%${term}%'`;
  const [response] = await db.query(sqlQuery);
  return response;
};

module.exports = {
  getAll,
  getById,
  newProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};