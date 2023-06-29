const { Schema, model } = require('mongoose');

const productsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const salesSchema = new Schema({
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    require: false,
    default: Date.now(),
  },
  quantity: {
    type: Number,
    require: true,
  },
});

const ProductModel = model('products', productsSchema);
const SalesModel = model('sales', salesSchema);

const seedProducts = [
  { name: 'Martelo de Thor' },
  { name: 'Traje de encolhimento' },
  { name: 'Escudo do Capitão América' },
];

const seedSales = [
  { productName: 'Martelo de Thor', quantity: 5 },
  { productName: 'Traje de encolhimento', quantity: 10 },
  { productName: 'Escudo do Capitão América', quantity: 15 },
];

const seedDatabase = async () => {
  if (!await ProductModel.count() > 0 && !await SalesModel.count() > 0) {
    await ProductModel.insertMany(seedProducts);
    await SalesModel.insertMany(seedSales);
    console.log('DATABASE SEEDED');
  }
};

module.exports = { ProductModel, seedDatabase };
