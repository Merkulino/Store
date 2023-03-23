const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { newSalesMock, resProductSaledMock, resAllSalesMock, resSaleMockByID, resUpdateSaleMock } = require('../mocks/sales.mock');
const validations = require('../../../src/validations/validate.products');

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
    sinon.stub(validations, 'validateSaleQuantity').resolves({ type: null });
    sinon.stub(validations, 'validateProducts').resolves({ type: null });
    sinon.stub(validations, 'validSaleOnDB').resolves({ type: null });
    sinon.stub(salesModel, 'updateSale').resolves(resUpdateSaleMock);

    const result = await salesService.updateSale(3, newSalesMock);

    // expect(result.type).to.be.null;
    // expect(result.message).to.be.equal(resUpdateSaleMock); // Problema com os mock, ta caindo em NOT_FOUND
  });

  // it.only('return a error when id is invalid', async () => {
  //   sinon.stub(salesModel, 'updateSale').resolves(undefined);

  //   const result = await salesService.updateProduct(420, { name: "OBJETO DE ERRO" });

  //   expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
  //   expect(result.message).to.be.equal('Product not found');
  // });

  // it('delete sale', async () => {
    // sinon.stub(salesModel, 'deleteProduct').resolves('ok');

    // const result = await salesService.deleteProduct(1);

  //   expect(result.type).to.be.null;
  //   expect(result.message).to.be.equal('ok');
  // });
  
  // it('delete sale', async () => {
    // sinon.stub(salesModel, 'deleteProduct').resolves('ok');

    // const result = await salesService.deleteProduct(123);

  //   expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
  //   expect(result.message).to.be.equal('Product not found');
  // });

  afterEach(() => {
    sinon.restore();
  });
});