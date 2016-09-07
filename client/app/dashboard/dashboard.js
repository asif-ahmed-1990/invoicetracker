'use strict';

angular.module('invoiceTrackerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        template: '<dashboard></dashboard>',
        authenticate: true
      });
  });
