'use strict';

describe('Component: PortfolioComponent', function () {

  // load the controller's module
  beforeEach(module('invoiceTrackerApp'));

  var PortfolioComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    PortfolioComponent = $componentController('portfolio', {});
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
