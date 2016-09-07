'use strict';

angular.module('invoiceTrackerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('invoice', {
        url: '/invoice/:invoiceId',
        template: '<invoice></invoice>',
        authenticate:true
      });
  });
