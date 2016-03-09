(function() {
	"use strict";

	angular.module('ListBuddyApp')
		.service('AuthService', AuthService);

	function AuthService($http) {

		var service = this;
		var baseURL = '/api/v1/';

		service.checkForAuth = function() {
	    var url = baseURL + "user/auth";
	    return $http.get(url);
	  }

	  service.signout = function() {
	  	var url = baseURL + "user/signout";
    	return $http.get(url);
	  }

	}

}());