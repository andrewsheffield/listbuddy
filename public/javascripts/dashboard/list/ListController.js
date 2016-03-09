(function() {
	"use strict";

	angular.module('ListBuddyApp')
		.controller('ListController', ListController);

	function ListController(ListService, DashboardService) {

		//Variable and mosel declaration
		var vm = this;
		vm.listModel = ListService.model;
		vm.dashModel = DashboardService.model;





		vm.setSelectedList = function(list) {
			console.log(list);
			vm.dashModel.selectedList = list;
		}
	  
	  vm.resetNewList = function() {
	    vm.newList.name = "";
	    vm.newList.type = 1;
	  }

	  vm.addNewList = function(newName, newType){

	  	var newList = {
	  		name: newName,
	  		type: newType
	  	}

	    if (newName) {
	      vm.loadingAddNewList = true;
	      ListService.createList(newList)
	        .success(function() {
	          ListService.populateLists(function() {
	            vm.loadingAddNewList = false;
	            vm.newListName = "";
	          });
	        })
	        .error(function(err) {
	          console.log(err);
	        });
	      }
	  };

	  vm.updateListName = function(){
	    vm.loadingNewName = true;
	    var listUpdate = { listname: vm.updateList.name };
	    ListService.updateListName(vm.selectedList.listid, listUpdate)
	      .success(function() {
	        vm.updateList.name = "";
	        vm.loadingNewName = false;
	        vm.populateLists();
	      })
	      .error(function(err) {
	        console.log(err);
	        vm.loadingNewName = false;
	      });
	  };
	  vm.removeList = function(id){
	    vm.incLoadCount();
	    ListService.deleteSelfFromList(id)
	      .success(function() {
	        vm.decLoadCount();
	        vm.populateLists();
	        vm.selectedList = null;
	      })
	      .error(function(err) {
	        console.log(err);
	        vm.decLoadCount();
	      });
	  };

	}


}());