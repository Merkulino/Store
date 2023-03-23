const { productsService } = require('../services');
const { setError } = require('../utils/statusCodeErros');

const getAll = async (req, res) => {
  const { type, message } = await productsService.getAll();
  if (type) return res.status(400).json(message);
  res.status(200).json(message);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getById(id);
  if (type) return res.status(404).json({ message });
  res.status(200).json(message);
};

const newProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.newProduct(name);
  if (type) return res.status(400).json(message);
  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const { type, message } = await productsService.updateProduct(id, product);
  if (type) return res.status(setError(type)).json({ message });
  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProduct(id);
  if (type) return res.status(setError(type)).json({ message });
  return res.status(204).send();
};

module.exports = {
  getAll,
  getById,
  newProduct,
  updateProduct,
  deleteProduct,
};