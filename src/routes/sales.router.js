const express = require('express');
const { salesController } = require('../controllers');
const validation = require('../middlewares/validateProducts');

const router = express.Router();

router.post('/',
  validation.newProduct,
  salesController.newSale);

module.exports = router;