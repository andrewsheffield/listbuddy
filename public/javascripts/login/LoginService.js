(function() {
	"use strict";

	angular.module('ListBuddyApp')
		.service('LoginService', LoginService);

	function LoginService($http) {

		var service = this;
		var baseURL = '/api/v1/';

		service.attemptLogin = function(data){
			var url = baseURL + "user/login";
	  	return $http.post(url, data);
	  };

	}

}());