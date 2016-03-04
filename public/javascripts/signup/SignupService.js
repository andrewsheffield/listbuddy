(function () {
	"use strict";

	angular.module("ListBuddyApp")
		.service('SignupService', SignupService);

		function SignupService($http) {

			var service = this;
			var baseURL = '/api/v1/';

			service.attemptSignup = function (data) {
				var url = baseURL + 'user/create'
		  	return $http.post(url, data);
		  }

		}

}());