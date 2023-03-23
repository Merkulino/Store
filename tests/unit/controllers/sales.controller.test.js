const { expect } = require('chai');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { newSalesMock,
        resProductSaledMock,
        newInvalidSaleMock,
        resAllSalesMock,
        resSaleMockByID, 
        resUpdateSaleMock} = require('../mocks/sales.mock');
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

  it('return all sales of db', async () => {
    const res = {};
    const req = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getAll').resolves({ type: null, message: resAllSalesMock });

    await salesController.listSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(resAllSalesMock);
  });
  
  it('return sale of db using id', async () => {
    const res = {};
    const req = {
      params: {
        id: 1
      }
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getById').resolves({ type: null, message: resSaleMockByID });

    await salesController.findSale(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(resSaleMockByID);
  });
  
  it('return a error when sale id not exist on db', async () => {
    const res = {};
    const req = {
      params: {
        id: 666
      }
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getById').resolves({ type: 'NOT_FOUND', message: 'Sale not found' });

    await salesController.findSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found'});
  });
  
  it('update an sale', async () => {
    const res = {};
    const req = {
      params: {
        id: 1,
      },
      body: {
        name: newSalesMock,
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'updateSale').resolves({ type: null, message: resUpdateSaleMock });

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(resUpdateSaleMock);
  });
  
  it('update an sale with error', async () => {
    const res = {};
    const req = {
      params: {
        id: 1,
      },
      body: {
        name: newInvalidSaleMock,
      },
    };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'updateSale').resolves({ type: 'INVALID_INPUT', message: '"quantity" must be greater than or equal to 1' });

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });

  // it('delete an sale', async () => {
  //   const res = {};
  //   const req = {
  //     params: {
  //       id: 1,
  //     },
  //   };
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();

  //   sinon.stub(salesService, 'delete').resolves('ok');

  //   await salesController.delete(req, res);

  //   expect(res.status).to.have.been.calledWith(204);
  // });

  // it('return a error when sale id not exist on db', async () => {
  //   const res = {};
  //   const req = {
  //     params: {
  //       id: 666
  //     }
  //   };
  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();

  //   sinon.stub(salesService, 'delete').resolves({ type: 'NOT_FOUND', message: 'Sale not found' });

  //   await salesController.delete(req, res);

  //   expect(res.status).to.have.been.calledWith(404);
  //   expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  // });

  afterEach(() => {
    sinon.restore();
  });
});