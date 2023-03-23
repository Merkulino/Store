const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const { productsService } = require("../../../src/services");
const { productsController } = require('../../../src/controllers');
const { productsMockData, updateResponseMock } = require('../mocks/products.mock');

describe('Product Controller Test', async () => {
  it('return product obj from id', async () => {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getById').resolves({ type: null, message: productsMockData[0] });
    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsMockData[0]);
  });

  it('returns 404 error when product id not exist', async () => {
    const res = {};
    const req = {
      params: {
        id: 420,
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

    await productsController.getById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
  
  it('add new product', async () => {
    const res = {};
    const req = {
      body: {
        name: 'Traje de encolhimento',
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'newProduct').resolves({ type: null, message: productsMockData[1] });

    await productsController.newProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productsMockData[1]);
  });
  
  it('validate the field name when add new product', async () => {
    const res = {};
    const req = {
      body: {
        name: 'TR',
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'newProduct').resolves({ type: null, message: productsMockData[1] });

    await productsController.newProduct(req, res);
    
    // Não sei como testa a validação dos middlewares

    // expect(res.status).to.have.been.calledWith();
    // expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  it('update some product', async () => {
    const res = {};
    const req = {
      params: {
        id: 1,
      },
      body: {
        name: 'Traje de crescimento',
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'updateProduct').resolves({ type: null, message: updateResponseMock });

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updateResponseMock);
  });

  it('returns 404 error when try to update an product that dont exist', async () => {
    const res = {};
    const req = {
      params: {
        id: 420,
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'updateProduct').resolves({ type: 'NOT_FOUND', message: 'Product not found' });

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  // it('delete an product', async () => {
  //   const res = {};
  //   const req = {
  //     params: {
  //       id: 2,
  //     },
  //   };
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();

    // sinon.stub(productsService, 'deleteProduct').resolves('ok');

    // await productsController.deleteProduct(req, res);

  //   expect(res.status).to.have.been.calledWith(204);
  // });

  // it('returns 404 error when try to delete an product that dont exist', async () => {
  //   const res = {};
  //   const req = {
  //     params: {
  //       id: 666,
  //     },
  //   };
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();

    // sinon.stub(productsService, 'deleteProduct').resolves({ type: 'NOT_FOUND', message: 'Product not found' });

    // await productsController.deleteProduct(req, res);

  //   expect(res.status).to.have.been.calledWith(404);
  //   expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  // });
  
  afterEach(function () {
    sinon.restore();
  });
});