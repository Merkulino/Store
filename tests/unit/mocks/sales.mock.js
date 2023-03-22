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

const newInvalidSaleMock = [
  {
    productId: 1,
    quantity: -404
  },
];

responseDBMock = [{
  fieldCount: 0,
  affectedRows: 2,
  insertId: 3,
  serverStatus: 2,
}];

module.exports = {
  newSalesMock,
  resProductSaledMock,
  newInvalidSaleMock,
  responseDBMock,
};