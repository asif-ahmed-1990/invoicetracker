'use strict';

describe('Component: card', function () {

  // load the component's module
  beforeEach(module('invoiceTrackerApp'));

  var cardComponent;

  // Initialize the component and a mock scope
  beforeEach(inject(function ($componentController) {
    cardComponent = $componentController('card', {});
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
