'use strict';

angular.module('invoiceTrackerApp.auth', ['invoiceTrackerApp.constants', 'invoiceTrackerApp.util',
    'ngCookies', 'ngRoute'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
