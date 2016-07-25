'use strict';

angular.module('invoiceTrackerApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/dashboard', {
        template: '<dashboard></dashboard>',
        authenticate: true
      });
  });
