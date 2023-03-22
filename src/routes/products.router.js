const express = require('express');
const { productsController } = require('../controllers');
const validation = require('../middlewares/validations');

const router = express.Router();

router.get('/', productsController.getAll);

router.get('/:id', productsController.getById);

router.post('/',
  validation.newProduct,
  productsController.newProduct);

module.exports = router;