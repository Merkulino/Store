const express = require('express');
const { salesController } = require('../controllers');
const validation = require('../middlewares/validations');

const router = express.Router();

router.post('/',
  validation.newSale,
  salesController.newSale);

module.exports = router;