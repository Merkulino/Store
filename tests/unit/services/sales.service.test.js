const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { newSalesMock, resProductSaledMock, resAllSalesMock, resSaleMockByID, resUpdateSaleMock } = require('../mocks/sales.mock');

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

  it('return sale updated from model', async () => {
    sinon.stub(salesModel, 'updateSale').resolves(resUpdateSaleMock);

    const result = await salesService.updateSale(1, newSalesMock);

    expect(result.type).to.be.null;
    expect(result.message).to.be.equal(resUpdateSaleMock);
  });

  // it.only('return a error when id is invalid', async () => {
  //   sinon.stub(salesModel, 'updateSale').resolves(undefined);

  //   const result = await salesService.updateProduct(420, { name: "OBJETO DE ERRO" });

  //   expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
  //   expect(result.message).to.be.equal('Product not found');
  // });

  // it('delete sale', async () => {
  //   sinon.stub(salesModel, 'delete').resolves('ok');

  //   const result = await salesService.delete(1);

  //   expect(result.type).to.be.null;
  //   expect(result.message).to.be.equal('ok');
  // });
  
  // it('delete sale', async () => {
  //   sinon.stub(salesModel, 'delete').resolves('ok');

  //   const result = await salesService.delete(123);

  //   expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
  //   expect(result.message).to.be.equal('Product not found');
  // });

  afterEach(() => {
    sinon.restore();
  });
});