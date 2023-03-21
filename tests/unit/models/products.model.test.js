const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/db.connection');
const { productsMockData } = require('../mocks/products.model.mock');

describe('Products Model Test', () => {
  it('returns all products on database', async () => {
    sinon.stub(connection, 'execute').resolves(productsMockData);
    
    const result = await productsModel.getAll();

    expect(result).to.deep.equal(...productsMockData);
  });
  
  it('returns product by id', async () => {
    sinon.stub(connection, 'execute').resolves([[productsMockData[1]]]);

    const result = await productsModel.getById(2);

    expect(result).to.deep.equal(productsMockData[1]);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});