const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { productsMockData } = require('../mocks/products.mock');

describe('Product Service Test', () => {
  it('Get the right values from db', async () => {
    sinon.stub(productsModel, 'getAll').resolves(productsMockData);

    const result = await productsService.getAll();

    expect(result.type).to.be.null;
    expect(result.message).to.be.equal(productsMockData);
  });
  
  it('Get the right object passing id', async () => {
    sinon.stub(productsModel, 'getById').resolves(productsMockData[0]);

    const result = await productsService.getById(1);

    expect(result.type).to.be.null;
    expect(result.message).to.be.equal(productsMockData[0]);
  });
  
  it('returns product not found when id is not on db', async () => {
    sinon.stub(productsModel, 'getById').resolves(undefined);

    const result = await productsService.getById(420);

    expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.be.equal('Product not found');
  });
  afterEach(function () {
    sinon.restore();
  });
});