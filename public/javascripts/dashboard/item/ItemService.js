(function() {
	"use strict";

	angular.module('ListBuddyApp')
		.service('ItemService', ItemService);

	function ItemService($http, DashboardService) {
		
		var service = this;
		var baseURL = '/api/v1/';

		service.model = {
			items: [],
			notCompleted: []
		};

		var model = service.model;

	  service.populateItems = function(next){
	    service.getItems(DashboardService.model.selectedList.listid)
	      .success(function(items) { 
	        model.items = items;
	        if (next) next();
	      })
	      .error(function(err) {
	        model.decLoadCount();
	        console.log(err);
	      });
	  };

    service.getItems = function(listid) {
	    var url = baseURL + "lists/" + listid + "/items";
	    return $http.get(url);
	  }
		
	}

}());