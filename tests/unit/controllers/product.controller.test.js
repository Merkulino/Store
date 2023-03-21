const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require("../../../src/services");
const { productsController } = require('../../../src/controllers');

describe('Product Controller Test', () => {
  it('returns 404 error when product id not exist', async () => {
    // const res = {};
    // const req = {
    //   params: {
    //     id: 420,
    //   },
    // };
    // res.status = sinon.stub().returns(res);
    // req.json = sinon.stub().returns();

    // sinon.stub(productsService, 'getById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

    // await productsController.getById(req, res);

    // expect(res.status).to.have.been.calledWith(404);
    // expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
  afterEach(function () {
    sinon.restore();
  });
});