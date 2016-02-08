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
  $scope.resetNewList = function() {
    $scope.newList = {};
    $scope.newList.type = 1;
  }
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
  $scope.addNewList = function(){
    $scope.incLoadCount();
    DashFactory.createList($scope.newList)
      .success(function() {
        $scope.decLoadCount();
        $scope.populateLists();
        $scope.resetNewList();
      })
      .error(function(err) {
        console.log(err);
        $scope.decLoadCount();
      });
  };
  $scope.setSelectedList = function(list){
    $scope.selectedList = list;
    $scope.incLoadCount();
    $scope.populateItems();
    $scope.populateListUsers();
  };
  $scope.updateListName = function(newListName){
    $scope.incLoadCount();
    var listUpdate = { listname: newListName };
    DashFactory.updateListName($scope.selectedList.listid, listUpdate)
      .success(function() {
        $scope.decLoadCount();
        $scope.populateLists();
      })
      .error(function(err) {
        console.log(err);
        $scope.decLoadCount();
      });
  };
  $scope.removeList = function(id){
    $scope.incLoadCount();
    DashFactory.deleteSelfFromList(id)
      .success(function() {
        $scope.decLoadCount();
        $scope.populateLists();
      })
      .error(function(err) {
        console.log(err);
        $scope.decLoadCount();
      });
  };
  
  //Pending List Class
  $scope.pendingLists = [];
  $scope.populatePendingLists = function(){
    $scope.incLoadCount();
    DashFactory.getPending()
      .success(function(lists) {
        $scope.decLoadCount();
        $scope.pendingLists = lists;
        $scope.setSelectedList($scope.lists[0]);
      })
      .error(function(err) {
        console.log(err);
        $scope.decLoadCount();
      });
  };
  $scope.approvePendingList = function(listid){
    $scope.incLoadCount();
    DashFactory.approveInvite(listid)
      .success(function(lists) {
        $scope.decLoadCount();
        $scope.populateLists();
        $scope.populatePendingLists();
      })
      .error(function(err) {
        console.log(err);
        $scope.decLoadCount();
      });
  };
  $scope.deletePendingList = function(listid){
    $scope.incLoadCount();
    DashFactory.declineInvite(listid)
      .success(function(lists) {
        $scope.decLoadCount();
        $scope.populateLists();
        $scope.populatePendingLists();
      })
      .error(function(err) {
        console.log(err);
        $scope.decLoadCount();
      });
  };
  
  //Item Class
  $scope.items = [];
  $scope.newItem = {};
  $scope.completed = [];
  $scope.notCompleted = [];
  $scope.trashed = [];
  $scope.populateItems = function(){
    $scope.incLoadCount();
    DashFactory.getItems($scope.selectedList.listid)
      .success(function(items) {
        $scope.decLoadCount();
        $scope.items = items;
      })
      .error(function(err) {
        $scope.decLoadCount();
        console.log(err);
      });
  };
  $scope.addNewSimple = function(newName){
    $scope.incLoadCount();
    var newItem = {
      name: newName
    };
    DashFactory.createNewItem($scope.selectedList.listid, newItem)
      .success(function() {
        $scope.decLoadCount();
        $scope.populateItems();
      })
      .error(function(err) {
        console.log(err);
        $scope.decLoadCount();
      });
  };
  $scope.addNewFinancial = function(newName, amount){
    $scope.incLoadCount();
    var newItem = {
      name: newName,
      price: amount
    };
    DashFactory.createNewItem($scope.selectedList.listid, newItem)
      .success(function() {
        $scope.decLoadCount();
        $scope.populateItems();
      })
      .error(function(err) {
        console.log(err);
        $scope.decLoadCount();
      });
  };
  $scope.addNewGift = function(newName, newRecipient){
    $scope.incLoadCount();
    var newItem = {
      name: newName,
      recipient: newRecipient
    };
    DashFactory.createNewItem($scope.selectedList.listid, newItem)
      .success(function() {
        $scope.decLoadCount();
        $scope.populateItems();
      })
      .error(function(err) {
        console.log(err);
        $scope.decLoadCount();
      });
  };
  $scope.setItemComplete = function(itemid){
    DashFactory.setItemComplete($scope.selectedList.listid, itemid)
      .success(function() {
        $scope.decLoadCount();
        $scope.populateItems();
      })
      .error(function(err) {
        console.log(err);
        $scope.decLoadCount();
      });
  };
  $scope.setItemIncomplete = function(itemid){
    DashFactory.setItemIncomplete($scope.selectedList.listid, itemid)
      .success(function() {
        $scope.decLoadCount();
        $scope.populateItems();
      })
      .error(function(err) {
        console.log(err);
        $scope.decLoadCount();
      });
  };
  $scope.trashItem = function(itemid){
    DashFactory.trashItem($scope.selectedList.listid, itemid)
      .success(function() {
        $scope.decLoadCount();
        $scope.populateItems();
      })
      .error(function(err) {
        console.log(err);
        $scope.decLoadCount();
      });
  };
  $scope.restoreItem = function(itemid){
    DashFactory.restoreItem($scope.selectedList.listid, itemid)
      .success(function() {
        $scope.decLoadCount();
        $scope.populateItems();
      })
      .error(function(err) {
        console.log(err);
        $scope.decLoadCount();
      });
  };
  
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
  $scope.populateListUsers = function() {
    $scope.incLoadCount();
    DashFactory.getUsers($scope.selectedList.listid)
      .success(function(users) {
        $scope.decLoadCount();
        $scope.listUsers = users;
      })
      .error(function(err) {
        $scope.decLoadCount();
        console.log(err);
      });
  };
  $scope.populateSearchUsers = function() {
    $scope.incLoadCount();
    if ($scope.userSearch.text != '') {
      DashFactory.searchUsers($scope.userSearch.text)
      .success(function(users) {
        $scope.decLoadCount();
        $scope.searchUsers = users;
      })
      .error(function(err) {
        $scope.decLoadCount();
        console.log(err);
      });
    }
  };
  $scope.removeUser = function(friendid) {
    $scope.incLoadCount();
    DashFactory.deleteOtherUser($scope.selectedList.listid, friendid)
      .success(function() {
        $scope.decLoadCount();
        $scope.populateListUsers();
      })
      .error(function(err) {
        $scope.decLoadCount();
        console.log(err);
      });
  };
  $scope.addUser = function(friendid) {
    $scope.incLoadCount();
    DashFactory.inviteFriend($scope.selectedList.listid, friendid)
      .success(function() {
        $scope.decLoadCount();
        $scope.userSearch.text = '';
      })
      .error(function(err) {
        $scope.decLoadCount();
        console.log(err);
      });
  };

  var init = function() {
    $scope.user = DashFactory.user;
    $scope.populateLists();
    $scope.populatePendingLists();
  }();
  
});