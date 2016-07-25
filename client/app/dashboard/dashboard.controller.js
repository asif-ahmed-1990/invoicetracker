'use strict';

(function(){

class DashboardComponent {
  constructor(Auth) {
  	this.Auth=Auth;
  }
}

angular.module('invoiceTrackerApp')
  .component('dashboard', {
    templateUrl: 'app/dashboard/dashboard.html',
    controller: DashboardComponent,
    controllerAs: 'dashboardCtrl'
  });

})();
