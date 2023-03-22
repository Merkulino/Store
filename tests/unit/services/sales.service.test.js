const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { newSalesMock } = require('../mocks/sales.mock');

describe('Sales Service Test', () => {
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

    sinon.stub(salesModel, 'newSale').resolves(mockObj);
    // sinon.stub(salesService, 'getById').resolves(mockObj);

    const result = await salesService.newSale(newSalesMock);

    // expect(result.type).to.be.null;
    // expect(result.message).to.be.equal(mockObj);
  });
  afterEach(() => {
    sinon.stub.resolves();
  });
});