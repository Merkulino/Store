const Joi = require('joi');

const validateNewProduct = Joi.string().min(5).required().label('name')
  .messages({
  // 'any.required': 'name is required',
  'string.min': '"name" length must be at least 5 characters long',
});

const validNewSale = Joi.array().items(Joi.object({
  productId: Joi.string().required(),
  quantity: Joi.number().min(1).required(),
}));

module.exports = {
  validateNewProduct,
  validNewSale,
};