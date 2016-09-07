'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var invoiceCtrlStub = {
  index: 'invoiceCtrl.index',
  show: 'invoiceCtrl.show',
  create: 'invoiceCtrl.create',
  update: 'invoiceCtrl.update',
  destroy: 'invoiceCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var invoiceIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './invoice.controller': invoiceCtrlStub
});

describe('Invoice API Router:', function() {

  it('should return an express router instance', function() {
    invoiceIndex.should.equal(routerStub);
  });

  describe('GET /api/invoices', function() {

    it('should route to invoice.controller.index', function() {
      routerStub.get
        .withArgs('/', 'invoiceCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/invoices/:id', function() {

    it('should route to invoice.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'invoiceCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/invoices', function() {

    it('should route to invoice.controller.create', function() {
      routerStub.post
        .withArgs('/', 'invoiceCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/invoices/:id', function() {

    it('should route to invoice.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'invoiceCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/invoices/:id', function() {

    it('should route to invoice.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'invoiceCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/invoices/:id', function() {

    it('should route to invoice.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'invoiceCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
