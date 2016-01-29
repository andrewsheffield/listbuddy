app.factory('DashFactory', function($http){
  var factory = {};
  factory.user = {};
  var baseURL = '/api/v1/';

  factory.getLists = function(){
    var url = baseURL + "lists";
    return $http.get(url);
  };

  factory.getItems = function(listid) {
    var url = baseURL + "lists/" + listid + "/items";
    return $http.get(url);
  }


  return factory;
});

app.controller('ListBuddyCont', function($scope, DashFactory) {
  
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
  $scope.populateLists = function(){
    $scope.incLoadCount();
    DashFactory.getLists()
      .success(function(lists) {
        $scope.decLoadCount();
        $scope.lists = lists;
        $scope.setSelectedList($scope.lists[0]);
      })
      .error(function(err) {
        console.log(err);
        $scope.decLoadCount();
      });
  };
  $scope.addNewList = function(){};
  $scope.setSelectedList = function(list){
    $scope.selectedList = list;
    $scope.incLoadCount();
    DashFactory.getItems($scope.selectedList.listid)
      .success(function(items) {
        $scope.decLoadCount();
        $scope.items = items;
      })
      .error(function(err) {
        $scope.decLoadCount();
        console.log(err);
      })
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

  var init = function() {
    $scope.user = DashFactory.user;
    $scope.populateLists();
  }();
  
});