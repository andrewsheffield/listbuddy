(function() {
	"use strict";

	angular.module('ListBuddyApp')
		.config(ListBuddyConfig);

	function ListBuddyConfig($routeProvider) {
	  $routeProvider
	    .when("/", {templateUrl: "partials/login.html"})
	    .when("/dash", {templateUrl: "partials/dash.html"});
	}

}());