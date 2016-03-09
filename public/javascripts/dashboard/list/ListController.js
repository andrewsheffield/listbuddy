(function() {
	"use strict";

	angular.module('ListBuddyApp')
		.controller('ListController', ListController);

	function ListController(ListService, DashboardService, ItemService) {

		//Variable and mosel declaration
		var vm = this;
		vm.listModel = ListService.model;
		vm.dashModel = DashboardService.model;





		vm.setSelectedList = function(list) {
			vm.dashModel.selectedList = list;
			ItemService.populateItems();
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

	  vm.removeList = function(id){
	    ListService.deleteSelfFromList(id)
	      .success(function() {
	        ListService.populateLists();
	        vm.dashModel.selectedList = null;
	      })
	      .error(function(err) {
	        console.log(err);
	      });
	  };

	}


}());