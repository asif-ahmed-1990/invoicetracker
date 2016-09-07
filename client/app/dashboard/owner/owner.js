'use strict';

angular.module('invoiceTrackerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.owner', {
        url: '/owner',
        parent: 'dashboard',
        views: {
            'owner@dashboard': {
                 template: '<owner></owner>'
             }
        },
        authenticate: true
      });
  });
