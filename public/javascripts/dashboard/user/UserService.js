(function() {
	"use strict";

	angular.module('ListBuddyApp')
		.service('UserService', UserService);

	function UserService() {
		var model = this;
		//Users class
	  model.listUsers = [];
	  model.pendingUsers = [];
	  model.searchUsers = [];
	}

}());