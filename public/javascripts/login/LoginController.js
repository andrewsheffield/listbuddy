(function() {
	"use strict";

	angular.module('ListBuddyApp')
		.controller('LoginController', LoginController);

	function LoginController($location, LoginService, AuthService) {

		var vm = this;

		vm.failedAuth = false;
		vm.passwordMismatch = false;
		vm.loginData = {};

	  AuthService.checkForAuth()
	    .success(function(user) {
	      $location.path('/dash');
	    })
	    .error(function(err) {
	      console.log(err);
	    });

		vm.attemptLogin = function() {
			vm.loginLoading = true;

			var loginData = {
				email: vm.email,
				password: vm.password
			}

			LoginService.attemptLogin(loginData)
				.success(function(user) {
					$location.path('/dash');
					vm.loginLoading = false;
				})
				.error(function(err) {
					vm.failedAuth = true;
					vm.loginLoading = false;
					console.log(err);
				});
		}
	}

}());