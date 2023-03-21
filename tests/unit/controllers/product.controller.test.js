const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require("../../../src/services");
const { productsController } = require('../../../src/controllers');
const { productsMockData } = require('../mocks/products.mock');

describe('Product Controller Test', () => {
  it('return product obj from id', async () => {
    const res = {};
    const req = {
      params: {
        id: 1,
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getById').resolves({ type: null, message: productsMockData[0] });

    await productsController.getById(req, res);

    // expect(res.json).to.deep.equal(productsMockData[0]);
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

    // expect(res.status).to.have.been.calledWith(404);
    // expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
  afterEach(function () {
    sinon.restore();
  });
});