var express = require('express');
var router = express.Router();
var dal = require('../models/data_access_layer');


/* GET home page. */
router.get('/', function(req, res, next) {

	res.render('index');

});

router.get('/dash', function(req, res, next) {

	res.render('index');

});

//getUserForAuth
router.post('/api/v1/user/login', function(req, res, next) {

	var email = req.body.email;
	var password = req.body.password;

	dal.getUserForAuth(email, password, function(err, user) {
		if (err) res.status(401).json(err);
		else {
			res.json(user);
		}
	});

});

//Create a new user, returns user when created
router.post('/api/v1/user/create', function(req, res, next) {

	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;
	var password = req.body.password;

	dal.createNewUser(firstname, lastname, email, password, function(err, user) {
  	if (err) res.json(err);
  	else res.json(user);
  });
});

// Get all lists for current user
router.get('/api/v1/lists', function(req, res, next) {

	var userid = 1; //Get from auth

	dal.getListsForUser(userid, function(err, lists) {

		if (err) res.json(err);
		else res.json(lists);

	});

});

// get all pending lists for user
router.get('/api/v1/pending', function(req, res, next) {

	var userid = 1; //Get from session auth

	dal.getPendingForUser(userid, function(err, lists) {
		if (err) res.status(500).json(err);
		else res.json(lists);
	})

});

//Get Items for list
router.get('/api/v1/lists/:listid/items', function(req, res, next) {

	var userid = 1; //Get from session auth
	var listid = req.params.listid;

	dal.getItemsForList(listid, userid, function(err, items) {
		if (err) res.status(500).json(err);
		else res.json(items);
	})

});

//Create new list
router.post('/api/v1/lists', function(req, res, next) {

	var userid = 1; //Get from auth
	var name = req.body.name;
	var type = req.body.type;

	dal.createNewList(name, type, userid, function(err, response) {

		if (err) res.status(500).json(err);
		else res.json(response);

	});

});

//Delete self from list
router.delete('/api/v1/lists/:listid', function(req, res, next) {

	var userid = 1; //Get from auth
	var listid = req.params.listid;

	dal.deleteSelfFromList(userid, listid, function(err, data) {
		if (err) res.status(500).json(err);
		else res.json(data);
	});

});

//Get users of a list
router.get('/api/v1/lists/:listid/users', function(req, res, next) {

	var listid = req.params.listid;
	var userid = 1; //Get From Auth

	dal.getUsersOfAList(listid, userid, function(err, users) {

		if (err) res.status(500).json(err);
		else res.json(users);

	});

});

//Invite Friend to a list
router.put('/api/v1/lists/:listid/users/:friendid', function(req, res, next) {

	var listid = req.params.listid;
	var friendid = req.params.friendid;
	var userid = 1; // get from auth

	dal.inviteFriendToList(friendid, listid, userid, function(err, data) {
		if (err) res.status(500).json(err);
		else res.json(data);
	})

});

// Approve an invite
router.put('/api/v1/lists/:listid/approve', function(req, res, next) {

	var userid = 1; // Get From Auth
	var listid = req.params.listid;

	dal.approveInvite(userid, listid, function(err, data) {
		if (err) res.status(500).json(err);
		else res.json(data);
	});

});

//decline an invite
router.put('/api/v1/lists/:listid/decline', function(req, res, next) {

	var userid = 1; // Get From Auth
	var listid = req.params.listid;

	dal.declineInvite(userid, listid, function(err, data) {
		if (err) res.status(500).json(err);
		else res.json(data);
	});

});

// update A list name
router.put('/api/v1/lists/:listid', function(req, res, next) {

	var listname = req.body.listname;
	var listid = req.params.listid;
	var userid = 1;  //Get from auth

	dal.updateListName(listname, listid, userid, function(err, data){
		if (err) res.status(500).json(err);
		else res.json(data);
	});

});

// Get users by email
router.get('/api/v1/search/users/:searchString', function(req, res, next) {

	var emailSubstring = req.params.searchString;

	dal.getUsersByEmail(emailSubstring, function(err, users) {
		if (err) res.status(500).json(err);
		else res.json(users);
	});

});

// delete Other user from a list
router.delete('/api/v1/lists/:listid/users/:friendid', function(req, res, next) {

	var userid = 1; //Get From Auth
	var listid = req.params.listid;
	var friendid = req.params.friendid;

	dal.deleteOtherUser(friendid, listid, userid, function(err, message) {
		if (err) res.status(500).json(err);
		else res.json(message);
	});

});

// Create New Item
router.post('/api/v1/lists/:listid', function(req, res, next) {

	var userid = 1; //Get From Auth
	var listid = req.params.listid;
	var name = req.body.name;
	var price = (req.body.price) ? req.body.price : 0;
	var recipient = (req.body.recipient) ? req.body.recipient : "";

	dal.createNewItem(listid, name, price, recipient, userid, function(err, message) {
		if (err) res.status(500).json(err);
		else res.json(message);
	});

});

// Trash Item
router.put('/api/v1/lists/:listid/items/:itemid/trash', function(req, res, next) {

	var userid = 1; // Get from auth
	var listid = req.params.listid;
	var itemid = req.params.itemid;

	dal.trashItem(itemid, userid, listid, function(err, message) {
		if (err) res.status(500).json(err);
		else res.json(message);
	});

});

// Restore from trash
router.put('/api/v1/lists/:listid/items/:itemid/restore', function(req, res, next) {

	var userid = 1; //get from auth
	var listid = req.params.listid;
	var itemid = req.params.itemid;

	dal.restoreItem(itemid, userid, listid, function(err, message) {
		if (err) res.status(500).json(err);
		else res.json(message);
	})

});

// Set complete
router.put('/api/v1/lists/:listid/items/:itemid/setcomplete', function(req, res, next) {

	var userid = 1; //get from auth
	var listid = req.params.listid;
	var itemid = req.params.itemid;

	dal.setItemComplete(itemid, userid, listid, function(err, message) {
		if (err) res.status(500).json(err);
		else res.json(message);
	})

});

router.put('/api/v1/lists/:listid/items/:itemid/setincomplete', function(req, res, next) {

	var userid = 1; //get from auth
	var listid = req.params.listid;
	var itemid = req.params.itemid;

	dal.setItemIncomplete(itemid, userid, listid, function(err, message) {
		if (err) res.status(500).json(err);
		else res.json(message);
	})

});

module.exports = router;
