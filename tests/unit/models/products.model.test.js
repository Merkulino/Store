const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/db.connection');
const { productsMockData, responseDBMock } = require('../mocks/products.mock');

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
  
  it('insert new product on db', async () => {
    sinon.stub(connection, 'execute').resolves(responseDBMock);

    const result = await productsModel.newProduct({ name: 'newProduct'});

    expect(result).to.be.equal(2);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});