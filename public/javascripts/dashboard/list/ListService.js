(function() {
	"use strict";

	angular.module('ListBuddyApp')
		.service('ListService', ListService);

	function ListService ($http) {

		var service = this;
		var baseURL = '/api/v1/';

		//Model declaration
		service.model = {
			lists: [],
			pendingLists: []
		}

		var model = service.model;

		service.populateLists = function(next){
	    var url = baseURL + "lists";
	    $http.get(url)
	      .success(function(lists) {
	        model.lists = lists;
	        if (next) next();
	      })
	      .error(function(err) {
	        console.log(err);
	      });
	  };

	  service.populateLists();

	  service.createList = function(newList) {
	    var url = baseURL + "lists";
	    return $http.post(url, newList);
	  }

	  service.deleteSelfFromList = function(listid) {
	    var url = baseURL + "lists/" + listid;
	    return $http.delete(url);
	  }

	  service.updateListName = function(listid, listUpdate) {
	    var url = baseURL + "lists/" + listid;
	    return $http.put(url, listUpdate);
	  }

	}

}());