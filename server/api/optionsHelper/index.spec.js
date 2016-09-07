'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var optionsHelperCtrlStub = {
  index: 'optionsHelperCtrl.index',
  show: 'optionsHelperCtrl.show',
  create: 'optionsHelperCtrl.create',
  update: 'optionsHelperCtrl.update',
  destroy: 'optionsHelperCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var optionsHelperIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './optionsHelper.controller': optionsHelperCtrlStub
});

describe('OptionsHelper API Router:', function() {

  it('should return an express router instance', function() {
    optionsHelperIndex.should.equal(routerStub);
  });

  describe('GET /api/optionsHelpers', function() {

    it('should route to optionsHelper.controller.index', function() {
      routerStub.get
        .withArgs('/', 'optionsHelperCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/optionsHelpers/:id', function() {

    it('should route to optionsHelper.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'optionsHelperCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/optionsHelpers', function() {

    it('should route to optionsHelper.controller.create', function() {
      routerStub.post
        .withArgs('/', 'optionsHelperCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/optionsHelpers/:id', function() {

    it('should route to optionsHelper.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'optionsHelperCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/optionsHelpers/:id', function() {

    it('should route to optionsHelper.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'optionsHelperCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/optionsHelpers/:id', function() {

    it('should route to optionsHelper.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'optionsHelperCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
