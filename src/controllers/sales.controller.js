const { salesService } = require('../services');
const { setError } = require('../utils/statusCodeErros');

const newSale = async (req, res) => {
  const sale = req.body;
  const { type, message } = await salesService.newSale(sale);
  if (type) return res.status(setError(type)).json({ message });
  res.status(201).json(message);
};

const listSales = async (req, res) => {
  const { type, message } = await salesService.getAll();
  if (type) return res.status(setError(type)).json({ message });
  res.status(200).json(message);
};

const findSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getById(id);
  if (type) return res.status(setError(type)).json({ message });
  res.status(200).json(message);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const { type, message } = await salesService.updateSale(id, sale);
  if (type) return res.status(setError(type)).json({ message });
  res.status(200).json(message);
};

module.exports = {
  newSale,
  listSales,
  findSale,
  updateSale,
};