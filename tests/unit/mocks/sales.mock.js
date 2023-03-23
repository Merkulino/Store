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

const resAllSalesMock = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2
  }
];

const resSaleMockByID = [
  {
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2
  },
  {
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2
  }
];

const resAllSalesMockNonNormalized = [
  {
    sale_id: 1,
    date: "2021-09-09T04:54:29.000Z",
    product_id: 1,
    quantity: 2
  },
  {
    sale_id: 1,
    date: "2021-09-09T04:54:54.000Z",
    product_id: 2,
    quantity: 2
  }
];

const resSaleMockByIdNonNormalized = [
  {
    sale_id: 1,
    date: "2021-09-09T04:54:29.000Z",
    product_id: 1,
    quantity: 2
  },
  {
    sale_id: 1,
    date: "2021-09-09T04:54:54.000Z",
    product_id: 2,
    quantity: 2
  }
];

const resUpdateSaleMock = {
  saleId: 3,
  itemsUpdated: [
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
  newInvalidSaleMock,
  responseDBMock,
  resAllSalesMock,
  resSaleMockByID,
  resAllSalesMockNonNormalized,
  resSaleMockByIdNonNormalized,
  resUpdateSaleMock,
};