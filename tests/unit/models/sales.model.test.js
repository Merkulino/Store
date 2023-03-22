const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/db.connection');
const {
  resProductSaledMock,
  newSalesMock,
  responseDBMock } = require('../mocks/sales.mock');

describe('Sales Model Test', () => {
  it('add new sale or sales', async () => {
    sinon.stub(connection, 'execute').onFirstCall().resolves(responseDBMock)
      .onSecondCall().resolves(responseDBMock);
    const result = await salesModel.newSale(newSalesMock);

    expect(result).to.deep.equal(resProductSaledMock);
  });
  afterEach(() => {
    sinon.restore();
  });
});