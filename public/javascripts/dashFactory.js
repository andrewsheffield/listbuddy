app.factory('DashFactory', function($http){
  var factory = {};
  var baseURL = '/api/v1/';

  factory.checkForAuth = function() {
    var url = baseURL + "user/auth";
    return $http.get(url);
  }

  factory.signout = function() {
    var url = baseURL + "user/signout";
    return $http.get(url);
  }

  factory.getLists = function(){
    var url = baseURL + "lists";
    return $http.get(url);
  };

  factory.getPending = function() {
    var url = baseURL + "pending";
    return $http.get(url);
  }

  factory.getItems = function(listid) {
    var url = baseURL + "lists/" + listid + "/items";
    return $http.get(url);
  }

  factory.createList = function(newList) {
    var url = baseURL + "lists";
    return $http.post(url, newList);
  }

  factory.deleteSelfFromList = function(listid) {
    var url = baseURL + "lists/" + listid;
    return $http.delete(url);
  }

  factory.getUsers = function(listid) {
    var url = baseURL + "lists/" + listid + "/users";
    return $http.get(url);
  }

  factory.getPendingUsers = function(listid) {
    var url = baseURL + "lists/" + listid + "/pendingusers";
    return $http.get(url);
  }

  factory.inviteFriend = function(listid, friendid) {
    var url = baseURL + "lists/" + listid + "/users/" + friendid;
    return $http.put(url);
  }

  factory.approveInvite = function(listid) {
    var url = baseURL + "lists/" + listid + "/approve";
    return $http.put(url);
  }

  factory.declineInvite = function(listid) {
    var url = baseURL + "lists/" + listid + "/decline";
    return $http.put(url);
  }

  factory.updateListName = function(listid, listUpdate) {
    var url = baseURL + "lists/" + listid;
    return $http.put(url, listUpdate);
  }

  factory.searchUsers = function(searchString) {
    var url = baseURL + "search/users/" + searchString;
    return $http.get(url);
  }

  factory.deleteOtherUser = function(listid, friendid) {
    var url = baseURL + "lists/" + listid + "/users/" + friendid;
    return $http.delete(url);
  }

  factory.removePendingUser = function(listid, pendinguserid) {
    var url = baseURL + "lists/" + listid + "/pendingusers/" + pendinguserid;
    return $http.delete(url);
  }

  factory.createNewItem = function(listid, newItem) {
    var url = baseURL + "lists/" + listid;
    return $http.post(url, newItem);
  }

  factory.trashItem = function(listid, itemid) {
    var url = baseURL + "lists/" + listid + "/items/" + itemid + "/trash";
    return $http.put(url);
  }

  factory.restoreItem = function(listid, itemid) {
    var url = baseURL + "lists/" + listid + "/items/" + itemid + "/restore";
    return $http.put(url);
  }

  factory.setItemComplete = function(listid, itemid) {
    var url = baseURL + "lists/" + listid + "/items/" + itemid + "/setcomplete";
    return $http.put(url);
  }

  factory.setItemIncomplete = function(listid, itemid) {
    var url = baseURL + "lists/" + listid + "/items/" + itemid + "/setincomplete";
    return $http.put(url);
  }

  return factory;
});