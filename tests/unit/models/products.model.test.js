const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const connection = require('../../../src/models/db.connection');
const { productsMockData, responseDBMock, updateResponseMock } = require('../mocks/products.mock');

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

  it('return product updated from db', async () => {
    const nameMock = { name: 'Traje de crescimento' };

    sinon.stub(connection, 'execute').onFirstCall().resolves(responseDBMock)
      .onSecondCall().resolves([[nameMock]]);
    
    const result = await productsModel.updateProduct(1, nameMock);
    expect(result).to.deep.equal(updateResponseMock);
  });
  
  // it('deelete an product from db', async () => {
  //   sinon.stub(connection, 'execute').resolves(responseDBMock);

  //   const result = await productsModel.delete(producto);

  //   expect(result).to.be.equal(seila);
  // });
  
  afterEach(function () {
    sinon.restore();
  });
});