const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { ProductModel } = require('../../../src/models/databaseODM');
const { productsMockData, responseDBMock, updateResponseMock, newProductResponse } = require('../mocks/products.mock');

describe('Products Model Test', () => {
  it('returns all products on database', async () => {
    sinon.stub(ProductModel, 'find').resolves(productsMockData);
    
    const result = await productsModel.getAll();
    
    expect(result).to.deep.equal(productsMockData);
  });
  
  it('returns product by id', async () => {
    sinon.stub(ProductModel, 'findById').resolves([[productsMockData[1]]]);

    const [[result]] = await productsModel.getById(2);
    
    expect(result).to.deep.equal(productsMockData[1]);
  });
  
  it('insert new product on db', async () => {
    sinon.stub(ProductModel, 'create').resolves(newProductResponse);

    const result = await productsModel.newProduct({ name: 'newProduct'});

    expect(result).to.be.equal(newProductResponse);
  });

  it('return product updated from db', async () => {
    const nameMock = { name: 'Traje de crescimento' };

    sinon.stub(ProductModel, 'findOneAndUpdate').onFirstCall().resolves('ok')
      .onSecondCall().resolves([[nameMock]]);
    
    const result = await productsModel.updateProduct(1, nameMock);
    expect(result).to.deep.equal(updateResponseMock);
  });
  
  it('deelete an product from db', async () => {
    sinon.stub(ProductModel, 'findByIdAndRemove').resolves(responseDBMock);

    const result = await productsModel.deleteProduct(999);

    expect(result).to.be.equal('ok');
  });
  
  it('Search an product from db', async () => {
    sinon.stub(ProductModel, 'find').resolves([productsMockData[0]]);

    const result = await productsModel.searchProduct('Thor');

    expect(result).to.deep.equal([productsMockData[0]]);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});