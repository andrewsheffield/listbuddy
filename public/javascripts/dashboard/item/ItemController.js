(function() {
	"use strict";

	angular.module('ListBuddyApp')
		.controller('ItemController', ItemController);

	function ItemController(ItemService) {
		var vm = this;
		vm.itemModel = ItemService.model;

		vm.addNewSimple = function(newName){

	    vm.loadingNewItem = true;

	    var newItem = {
	      name: newName
	    };
	    DashFactory.createNewItem(vm.selectedList.listid, newItem)
	      .success(function() {

	        vm.populateItems(function() {
	          vm.newItem.name = "";
	          vm.loadingNewItem = false;
	        });

	      })
	      .error(function(err) {
	        vm.loadingNewItem = false;
	        console.log(err);
	      });
	  };
	  vm.addNewFinancial = function(newName, amount){
	    vm.loadingNewItem = true;
	    var newItem = {
	      name: newName,
	      price: amount
	    };
	    DashFactory.createNewItem(vm.selectedList.listid, newItem)
	      .success(function() {

	        vm.populateItems(function() {
	          vm.newItem.name = "";
	          vm.newItem.amount = "";
	          vm.loadingNewItem = false;
	        });

	      })
	      .error(function(err) {
	        console.log(err);
	        vm.loadingNewItem = false;
	      });
	  };
	  vm.addNewGift = function(newName, newRecipient){
	    vm.loadingNewItem = true;
	    var newItem = {
	      name: newName,
	      recipient: newRecipient
	    };
	    DashFactory.createNewItem(vm.selectedList.listid, newItem)
	      .success(function() {

	        vm.populateItems(function() {
	          vm.newItem.name = "";
	          vm.newItem.recipient = "";
	          vm.loadingNewItem = false;
	        });

	      })
	      .error(function(err) {
	        console.log(err);
	        vm.loadingNewItem = false;
	      });
	  };
	  vm.setItemComplete = function(itemid){
	    DashFactory.setItemComplete(vm.selectedList.listid, itemid)
	      .success(function() {
	        vm.decLoadCount();
	        vm.populateItems();
	      })
	      .error(function(err) {
	        console.log(err);
	        vm.decLoadCount();
	      });
	  };
	  vm.setItemIncomplete = function(itemid){
	    DashFactory.setItemIncomplete(vm.selectedList.listid, itemid)
	      .success(function() {
	        vm.decLoadCount();
	        vm.populateItems();
	      })
	      .error(function(err) {
	        console.log(err);
	        vm.decLoadCount();
	      });
	  };
	  vm.trashItem = function(itemid){
	    DashFactory.trashItem(vm.selectedList.listid, itemid)
	      .success(function() {
	        vm.decLoadCount();
	        vm.populateItems();
	      })
	      .error(function(err) {
	        console.log(err);
	        vm.decLoadCount();
	      });
	  };
	  vm.restoreItem = function(itemid){
	    DashFactory.restoreItem(vm.selectedList.listid, itemid)
	      .success(function() {
	        vm.decLoadCount();
	        vm.populateItems();
	      })
	      .error(function(err) {
	        console.log(err);
	        vm.decLoadCount();
	      });
	  };
	}

}());