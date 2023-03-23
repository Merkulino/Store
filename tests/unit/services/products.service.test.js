const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { productsMockData, updateResponseMock } = require('../mocks/products.mock');

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

  it('get obj data from db when add new product', async () => {
    const mockObj = { id: 2, name: 'productName' };
 
    sinon.stub(productsModel, 'newProduct').resolves(2);
    sinon.stub(productsModel, 'getById').resolves(mockObj);

    const result = await productsService.newProduct(mockObj);

    expect(result.type).to.be.null;
    expect(result.message).to.be.equal(mockObj);
  });

  it('return product updated from model', async () => {
    // sinon.stub(productsModel, 'updateProduct').resolves(updateResponseMock);

    // const result = await productsService.updateProduct(1, { name: "Traje de crescimento" });

    // expect(result.type).to.be.null;
    // expect(result.message).to.be.equal(updateResponseMock);
  });

  it('return a error when id is invalid', async () => {
    // sinon.stub(productsModel, 'updateProduct').resolves(undefined);

    // const result = await productsService.updateProduct(420, { name: "OBJETO DE ERRO" });

    // expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
    // expect(result.message).to.be.equal('Product not found');
  });

  afterEach(function () {
    sinon.restore();
  });
});