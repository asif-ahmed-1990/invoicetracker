'use strict';

class NavbarController {
  //end-non-standard

  //start-non-standard
  constructor(Auth,$state) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.$state=$state;
  }
}

angular.module('invoiceTrackerApp')
  .controller('NavbarController', NavbarController);
