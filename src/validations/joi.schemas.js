const Joi = require('joi');

const validateNewProduct = Joi.object({
  name: Joi.string().min(5).required().label('name'),
}).messages({
  'any.required': 'name is required',
  'string.min': '"name" length must be at least 5 characters long',
});

module.exports = {
  validateNewProduct,
};