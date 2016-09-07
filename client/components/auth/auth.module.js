'use strict';

angular.module('invoiceTrackerApp.auth', ['invoiceTrackerApp.constants', 'invoiceTrackerApp.util',
    'ngCookies', 'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
