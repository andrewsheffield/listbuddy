(function() {
	"use strict";

	angular.module('ListBuddyApp')
		.controller('DashboardController', DashboardController);

	function DashboardController
	(	$location,
		$interval, 
		AuthService, 
		DashboardService ) {

		var vm = this;
		vm.dbModel = DashboardService.model;

		vm.signout = function() {
	    AuthService.signout()
	      .success(function() {
	        $location.path('/');
	      })
	      .error(function(err) {
	        console.log(err);
	        $location.path('/');
	      });
		}

	  console.log("loaded db controller")

	}

}());