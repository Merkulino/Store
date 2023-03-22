const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { newSalesMock, resProductSaledMock, resAllSalesMock, resSaleMockByID } = require('../mocks/sales.mock');

describe('Sales Service Test', () => {
  it('add new sale or sales', async () => {
    sinon.stub(salesModel, 'newSale').resolves(resProductSaledMock);

    const result = await salesService.newSale(newSalesMock);

    expect(result.type).to.be.null;
    expect(result.message).to.be.equal(resProductSaledMock);
  });
  
  it('get all sales from db', async () => {
    sinon.stub(salesModel, 'getAll').resolves(resAllSalesMock);

    const result = await salesService.getAll();

    expect(result.type).to.be.null;
    expect(result.message).to.be.equal(resAllSalesMock);
  });
  
  it('get sales from db by id', async () => {
    sinon.stub(salesModel, 'getById').resolves(resSaleMockByID);

    const result = await salesService.getById(1);

    expect(result.type).to.be.null;
    expect(result.message).to.be.equal(resSaleMockByID);
  });
  
  it('return a error when dont find sale id', async () => {
    sinon.stub(salesModel, 'getById').resolves([]);

    const result = await salesService.getById(42);

    expect(result.type).to.be.equal('NOT_FOUND');
    expect(result.message).to.be.equal('Sale not found');
  });

  afterEach(() => {
    sinon.restore();
  });
});