(function() {
	"use strict";

	angular.module('ListBuddyApp')
		.service('ItemService', ItemService);

	function ItemService() {
		
		var model = this;

		model.items = [];
		model.newItem = {};
	  model.loadingNewItem = false;
	  model.completed = [];
	  model.notCompleted = [];
	  model.trashed = [];
	  model.populateItems = function(next){
	    DashFactory.getItems(model.selectedList.listid)
	      .success(function(items) {
	        model.decLoadCount();
	        model.items = items;
	        if (next) next();
	      })
	      .error(function(err) {
	        model.decLoadCount();
	        console.log(err);
	      });
	  };
		
	}

}());