'use strict';

describe('Component: OwnerComponent', function () {

  // load the controller's module
  beforeEach(module('invoiceTrackerApp'));

  var OwnerComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    OwnerComponent = $componentController('owner', {});
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
