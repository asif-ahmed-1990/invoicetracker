'use strict';

class LoginController {
  constructor(Auth, $location, $state) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$location = $location;
    this.$state = $state;
    if(this.Auth.isLoggedIn()){
      this.$state.go('dashboard.portfolio');
    }
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Logged in, redirect to home
          this.$state.go('dashboard.portfolio');
        })
        .catch(err => {
          this.errors.other = err.message;
        });
    }
  }
}

angular.module('invoiceTrackerApp')
  .controller('LoginController', LoginController);
