'use strict';

describe('Component: UploadComponent', function () {

  // load the controller's module
  beforeEach(module('invoiceTrackerApp'));

  var UploadComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    UploadComponent = $componentController('upload', {});
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
