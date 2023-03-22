const newSalesMock = [
  {
    productId: 1,
    quantity: 1
  },
  {
    productId: 2,
    quantity: 5
  }
];

const resProductSaledMock = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1
    },
    {
      productId: 2,
      quantity: 5
    }
  ]
}


module.exports = {
  newSalesMock,
  resProductSaledMock,
};