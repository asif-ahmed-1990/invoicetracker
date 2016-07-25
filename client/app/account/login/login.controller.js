'use strict';

class LoginController {
  constructor(Auth, $location) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$location = $location;
    console.log(this.Auth.isLoggedIn());
    if(this.Auth.isLoggedIn()){
      this.$location.path('/dashboard');
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
          this.$location.path('/dashboard');
        })
        .catch(err => {
          this.errors.other = err.message;
        });
    }
  }
}

angular.module('invoiceTrackerApp')
  .controller('LoginController', LoginController);
