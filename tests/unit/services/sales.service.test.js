const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { newSalesMock, resProductSaledMock } = require('../mocks/sales.mock');

describe('Sales Service Test', () => {
  it('add new sale or sales', async () => {
    sinon.stub(salesModel, 'newSale').resolves(resProductSaledMock);

    const result = await salesService.newSale(newSalesMock);

    expect(result.type).to.be.null;
    expect(result.message).to.be.equal(resProductSaledMock);
  });
  afterEach(() => {
    sinon.restore();
  });
});