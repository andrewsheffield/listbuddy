var app = angular.module('ListBuddyApp', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {templateUrl: "partials/login.html"})
    .when("/dash", {templateUrl: "partials/dash.html"});
});

app.factory('ListBuddyFactory', function($http){
  var factory = {};

  factory.getSessions = function(){
   return {};
  };

  return factory;
});

app.controller('ListBuddyCont', function($scope, ListBuddyFactory) {
  
  //Set connection status to false if ajax connection issue occurs
  $scope.connectionStatus = true;
  
  //Loading control block
  $scope.loadCount = 0;
  $scope.incLoadCount = function() {$scope.loadCount++};
  $scope.decLoadCount = function() {
    ($scope.loadCount == 0)? $scope.loadCount = 0 : $scope.loadCount--;
  };
  //End of loading Block
  
  //user and notifications
  $scope.user = {};
  $scope.notifications = [];

  //List Class
  $scope.newList = { type: 1 }; //inits default type to simple
  $scope.lists = [];
  $scope.selectedList = null;
  $scope.populateLists = function(){};
  $scope.addNewList = function(){};
  $scope.setSelectedList = function(list){
    $scope.selectedList = list;
    $scope.items = [];
  };
  $scope.updateListName = function(newListName){};
  $scope.removeList = function(id){};
  
  //Pending List Class
  $scope.pendingLists = [];
  $scope.populatePendingLists = function(){};
  $scope.approvePendingList = function(id){};
  $scope.deletePendingList = function(id){};
  
  //Item Class
  $scope.items = [];
  $scope.newItem = {};
  $scope.completed = [];
  $scope.notCompleted = [];
  $scope.trashed = [];
  $scope.populateItems = function(){};
  $scope.addNewSimple = function(name){};
  $scope.addNewFinancial = function(name, amount){};
  $scope.addNewGift = function(name, recipient){};
  $scope.setItemComplete = function(){};
  $scope.setItemIncomplete = function(){};
  $scope.trashItem = function(){};
  $scope.restoreItem = function(){};
  
  //Users class
  $scope.listUsers = [];
  $scope.searchUsers = [];
  $scope.userSearch = {
    text: ""
  };
  $scope.clearUserSearch = function() {
    $scope.userSearch.text = "";
    $scope.searchUsers = [];
  };
  $scope.populateListUsers = function() {};
  $scope.populateSearchUsers = function() {};
  $scope.removeUser = function(id) {};
  $scope.addUser = function(id) {};
  
});