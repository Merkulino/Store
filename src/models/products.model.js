const { ProductModel: db } = require('./databaseODM');

const getAll = async () => db.find();

const getById = async (id) => {
  try {
    const response = await db.findById(id);
    return response;
  } catch (error) {
    return undefined;
  }
};

const newProduct = async (productData) => {
  try {
    const response = await db.create({ name: productData });
    return response;
  } catch (error) {
    return undefined;
  }
};

const updateProduct = async (id, { name }) => db.findOneAndUpdate({ _id: id }, { name })
  .then(() => ({ id, name }))
  .catch((error) => error);

const deleteProduct = async (id) => {
  try {
    await db.findByIdAndRemove({ _id: id });
    return 'ok';
  } catch (error) {
    return undefined;
  }
};

const searchProduct = async (term) => db.find({ name: { $regex: term, $options: 'i' } });

module.exports = {
  getAll,
  getById,
  newProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};