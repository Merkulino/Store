const { salesService } = require('../services');
const { setError } = require('../utils/statusCodeErros');

const newSale = async (req, res) => {
  const sale = req.body;
  const { type, message } = await salesService.newSale(sale);
  if (type) return res.status(setError(type)).json({ message });
  res.status(201).json(message);
};

module.exports = {
  newSale,
};