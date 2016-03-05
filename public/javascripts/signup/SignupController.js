(function() {
	"use strict";

	angular.module('ListBuddyApp')
		.controller('SignupController', SignupController);

	function SignupController ($location, SignupService) {
		var vm = this;

		vm.attemptSignup = function () {

			vm.passwordMismatch = false;
			vm.failed = false;

			if (vm.password != vm.confirmPassword) {
				vm.passwordMismatch = true;
			} else {
				vm.signupLoading = true;
				vm.passwordMismatch = false;

				var newUser = {
					firstname: vm.firstname,
					lastname: vm.lastname,
					email: vm.email,
					password: vm.password
				}

				SignupService.attemptSignup(newUser)
					.success(function(user) {
						$location.path('/dash');
						vm.signupLoading = false;
					})
					.error(function(err) {
						console.log(err);
						vm.failed = true;
						vm.signupLoading = false;
					});
			}
		}
	}
	
}());