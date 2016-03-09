(function() {
	"use strict";

	angular.module('ListBuddyApp')
		.controller('UserController', UserController);

	function UserController() {

		var vm = this;

		vm.userSearch = {
	    text: ""
	  };
	  vm.clearUserSearch = function() {
	    vm.userSearch.text = "";
	    vm.searchUsers = [];
	  };
	  vm.populateListUsers = function() {
	    vm.incLoadCount();
	    DashFactory.getUsers(vm.selectedList.listid)
	      .success(function(users) {
	        vm.decLoadCount();
	        vm.listUsers = users;
	      })
	      .error(function(err) {
	        vm.decLoadCount();
	        console.log(err);
	      });
	  };
	  vm.populatePendingUsers = function() {
	    vm.incLoadCount();
	    DashFactory.getPendingUsers(vm.selectedList.listid)
	      .success(function(users) {
	        vm.decLoadCount();
	        vm.pendingUsers = users;
	      })
	      .error(function(err) {
	        vm.decLoadCount();
	        console.log(err);
	      });
	  };
	  vm.populateSearchUsers = function() {
	    vm.incLoadCount();
	    if (vm.userSearch.text != '') {
	      DashFactory.searchUsers(vm.userSearch.text, vm.selectedList.listid)
	      .success(function(users) {
	        vm.decLoadCount();
	        vm.searchUsers = users;
	      })
	      .error(function(err) {
	        vm.decLoadCount();
	        console.log(err);
	      });
	    }
	  };
	  vm.removeUser = function(friendid) {
	    vm.incLoadCount();
	    DashFactory.deleteOtherUser(vm.selectedList.listid, friendid)
	      .success(function() {
	        vm.decLoadCount();
	        vm.populateListUsers();
	      })
	      .error(function(err) {
	        vm.decLoadCount();
	        console.log(err);
	      });
	  };
	  vm.removePendingUser = function(pendinguserid) {
	    DashFactory.removePendingUser(vm.selectedList.listid, pendinguserid) 
	      .success(function() {
	        vm.populatePendingUsers();
	      })
	      .error(function(err) {
	        console.log(err);
	      });
	  };
	  vm.addUser = function(friendid) {
	    vm.incLoadCount();
	    DashFactory.inviteFriend(vm.selectedList.listid, friendid)
	      .success(function() {
	        vm.decLoadCount();
	        vm.userSearch.text = '';
	        vm.populatePendingUsers();
	      })
	      .error(function(err) {
	        vm.decLoadCount();
	        console.log(err);
	      });
	  };
	}

}());