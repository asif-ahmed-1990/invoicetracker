'use strict';

angular.module('invoiceTrackerApp', ['invoiceTrackerApp.auth', 'invoiceTrackerApp.admin',
    'invoiceTrackerApp.constants', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.router',
    'btford.socket-io', 'validation.match', 'ngMaterial','rzModule','ngFileUpload'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/login');

    $locationProvider.html5Mode(true);
  });
