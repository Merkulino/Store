const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { resProductSaledMock } = require('../mocks/sales.mock');

describe('Sales Model Test', () => {
  it('add new sale or sales', async () => {
    const mockObj = {
      id: 3,
      // {
      // "productId": 1,
      //   "quantity": 1
      // },
      // {
      // "productId": 2,
      //   "quantity": 5
      // }
    };
    sinon.stub(connection, 'execute').resolves(mockObj);

    const result = await salesModel.newSale(resProductSaledMock.itemsSold);

    // expect(result).to.be.equal(mockObj);
  });
  afterEach(() => {
    sinon.stub.resolves();
  });
});