(function() {
	"use strict";

	angular.module('ListBuddyApp')
		.controller('LoginController', LoginController);

	function LoginController($location, LoginService, AuthService) {

		var vm = this;

		vm.failed = false;
		vm.passwordMismatch = false;
		vm.loginData = {};

	  AuthService.checkForAuth()
	    .success(function(data) {
	    	if (data.id) { //if data is user
	    		$location.path('/dash');
	    	} else {
	    		console.log(data);
	    	}
	    })
	    .error(function(err) {
	      console.log(err);
	    });

		vm.attemptLogin = function() {
			vm.loading = true;

			var loginData = {
				email: vm.email,
				password: vm.password
			}

			LoginService.attemptLogin(loginData)
				.success(function(user) {
					$location.path('/dash');
					vm.loading = false;
				})
				.error(function(err) {
					vm.failed = true;
					vm.loading = false;
					console.log(err);
				});
		}
	}

}());