const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/db.connection');
const {
  resProductSaledMock,
  newSalesMock,
  responseDBMock, 
  resAllSalesMock,
  resAllSalesMockNonNormalized,
  resSaleMockByIdNonNormalized,
  resSaleMockByID} = require('../mocks/sales.mock');

describe('Sales Model Test', () => {
  it('add new sale or sales', async () => {
    sinon.stub(connection, 'execute').onFirstCall().resolves(responseDBMock)
      .onSecondCall().resolves(responseDBMock);
    const result = await salesModel.newSale(newSalesMock);

    expect(result).to.deep.equal(resProductSaledMock);
  });
  
  it('get all sales from db', async () => {
    sinon.stub(connection, 'execute').resolves([resAllSalesMockNonNormalized]);
    const result = await salesModel.getAll();

    expect(result).to.deep.equal(resAllSalesMock);
  });
  
  it('get sales from db with id', async () => {
    sinon.stub(connection, 'execute').resolves([resSaleMockByIdNonNormalized]);
    const result = await salesModel.getById(1);

    expect(result).to.deep.equal(resSaleMockByID);
  });

  // it('return product updated from db', async () => {
  //   // sinon.stub(connection, 'execute').resolves(updateResponseMock);

  //   // const result = await productsModel.updateProduct(1, { name: 'Traje de crescimento' });

  //   // expect(result).to.deep.equal(updateResponseMock);
  // });

  // it('test error on update product', async () => { });

  afterEach(() => {
    sinon.restore();
  });
});