'use strict';

angular.module('invoiceTrackerApp', ['invoiceTrackerApp.auth', 'invoiceTrackerApp.admin',
    'invoiceTrackerApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ngRoute',
    'btford.socket-io', 'validation.match'
  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider.otherwise({
      redirectTo: '/login'
    });

    $locationProvider.html5Mode(true);
  });
