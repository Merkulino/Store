const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const {SalesModel} = require('../../../src/models/databaseODM');
const {
  resProductSaledMock,
  newSalesMock,
  responseDBMock, 
  resAllSalesMock,
  resAllSalesMockNonNormalized,
  resSaleMockByIdNonNormalized,
  resSaleMockByID,
  resUpdateSaleMock} = require('../mocks/sales.mock');

describe('Sales Model Test', () => {
  it('add new sale or sales', async () => {
    sinon.stub(SalesModel, 'create').onFirstCall().resolves(responseDBMock)
      .onSecondCall().resolves(responseDBMock);
    const result = await salesModel.newSale(newSalesMock);

    expect(result).to.deep.equal(resProductSaledMock);
  });
  
  it('get all sales from db', async () => {
    sinon.stub(SalesModel, 'find').resolves([resAllSalesMockNonNormalized]);
    const result = await salesModel.getAll();

    expect(result).to.deep.equal(resAllSalesMock);
  });
  
  it('get sales from db with id', async () => {
    sinon.stub(SalesModel, 'findById').resolves([resSaleMockByIdNonNormalized]);
    const result = await salesModel.getById(1);

    expect(result).to.deep.equal(resSaleMockByID);
  });

  it('return sale updated from db', async () => {
    sinon.stub(SalesModel, 'findOneAndUpdate').onFirstCall().resolves([resSaleMockByIdNonNormalized])
      .onSecondCall().resolves(responseDBMock);
    const result = await salesModel.updateSale(3, newSalesMock);

    expect(result).to.deep.equal(resUpdateSaleMock);
  });

  it('deelete an sale from db', async () => {
    sinon.stub(SalesModel, 'findOneAndRemove').onFirstCall().resolves(responseDBMock)
      .onSecondCall().resolves(responseDBMock);

    const result = await salesModel.deleteSale(999);

    expect(result).to.be.equal('ok');
  });

  afterEach(() => {
    sinon.restore();
  });
});