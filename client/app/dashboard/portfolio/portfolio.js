'use strict';

angular.module('invoiceTrackerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard.portfolio', {
        url: '/portfolio',
        parent: 'dashboard',
        views: {
            'portfolio@dashboard': {
                 template: '<portfolio></portfolio>'
             }
        },
        authenticate: true
      });
  });


