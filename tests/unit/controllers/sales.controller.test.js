const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { newSalesMock, resProductSaledMock, newInvalidSaleMock } = require('../mocks/sales.mock');
chai.use(sinonChai);

describe('Sale Controller Test', () => {
  it('add new sale', async () => {
    const res = {};
    const req = {
      body: newSalesMock,
    };
    res.status = sinon.stub().returns(res); 
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'newSale').resolves({ type: null, message: resProductSaledMock });

    await salesController.newSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(resProductSaledMock);
  });
  
  it('test an error when add new sale: quantity value not valid', async () => {
    const res = {};
    const req = {
      body: newInvalidSaleMock,
    };
    res.status = sinon.stub().returns(res); 
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'newSale').resolves({ type: 'INVALID_INPUT', message: '"quantity" must be greater than or equal to 1' });

    await salesController.newSale(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });
  afterEach(() => {
    sinon.restore();
  });
});