var express = require('express');
var router = express.Router();
var dal = require('../models/data_access_layer');
var passport = require('passport');


/* GET home page. */
router.get('/', function(req, res, next) {

	res.render('index');

});

router.get('/dash', function(req, res, next) {

	res.render('index');

});

router.get('/api/v1/user/signout', function(req, res, next) {
	req.logout();
	res.json({message:"Logout successful"});
});

//login and return user
router.post('/api/v1/user/login', function(req, res, next) {

	var email = req.body.email;
	var password = req.body.password;

	dal.getUserForAuth(email, password, function(err, user) {
		if (err) res.status(401).json(err);
		else {
			req.login(user, function(err) {
				if (err) return next(err);
				else res.json(user);
				console.log(user);
			});
		}
	});
});

router.get('/api/v1/user/auth', function(req, res, next) {
	if (req.user) res.json(req.user);
	else res.status(401).json({message: "No user is authenticated"});
});

//Create a new user, returns user when created
router.post('/api/v1/user/create', function(req, res, next) {

	String.prototype.properCaps = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
	}

	if (!req.body.firstname 
			|| !req.body.lastname
			|| !req.body.email
			|| !req.body.password)
	{
		return res.status(400).json({message: "Missing values for input."});
	}

	var firstname = req.body.firstname.properCaps();
	var lastname = req.body.lastname.properCaps();
	var email = req.body.email.toLowerCase();
	var password = req.body.password;

	dal.createNewUser(firstname, lastname, email, password, function(err, user) {
  	if (err) res.status(400).json(err);
  	else {
  		req.login(user, function(err) {
				if (err) return next(err);
				else return res.json(user);
			});
  	}
  });
});

// Get all lists for current user
router.get('/api/v1/lists', function(req, res, next) {

	var userid = req.user.id; //Get from auth

	dal.getListsForUser(userid, function(err, lists) {

		if (err) res.json(err);
		else res.json(lists);

	});

});

// get all pending lists for user
router.get('/api/v1/pending', function(req, res, next) {

	var userid = req.user.id; //Get from auth

	dal.getPendingForUser(userid, function(err, lists) {
		if (err) res.status(500).json(err);
		else res.json(lists);
	})

});

//Get Items for list
router.get('/api/v1/lists/:listid/items', function(req, res, next) {

	var userid = req.user.id; //Get from auth
	var listid = req.params.listid;

	dal.getItemsForList(listid, userid, function(err, items) {
		if (err) res.status(500).json(err);
		else res.json(items);
	})

});

//Create new list
router.post('/api/v1/lists', function(req, res, next) {

	var userid = req.user.id; //Get from auth
	var name = req.body.name;
	var type = req.body.type;

	dal.createNewList(name, type, userid, function(err, response) {

		if (err) res.status(500).json(err);
		else res.json(response);

	});

});

//Delete self from list
router.delete('/api/v1/lists/:listid', function(req, res, next) {

	var userid = req.user.id; //Get from auth
	var listid = req.params.listid;

	dal.deleteSelfFromList(userid, listid, function(err, data) {
		if (err) res.status(500).json(err);
		else res.json(data);
	});

});

//Get users of a list
router.get('/api/v1/lists/:listid/users', function(req, res, next) {

	var listid = req.params.listid;
	var userid = req.user.id; //Get from auth

	dal.getUsersOfAList(listid, userid, function(err, users) {

		if (err) return res.status(500).json(err);
		else return res.json(users);

	});

});

//Get Pending of a list
router.get('/api/v1/lists/:listid/pendingusers', function(req, res, next) {

	var listid = req.params.listid;
	var userid = req.user.id; // get from auth

	dal.getPendingOfAList(listid, userid, function(err, users) {

		if (err) return res.status(500).json(err);
		else return res.json(users);

	});

});

//Invite Friend to a list
router.put('/api/v1/lists/:listid/users/:friendid', function(req, res, next) {

	var listid = req.params.listid;
	var friendid = req.params.friendid;
	var userid = req.user.id; //Get from auth

	dal.inviteFriendToList(friendid, listid, userid, function(err, data) {
		if (err) res.status(500).json(err);
		else res.json(data);
	})

});

// Approve an invite
router.put('/api/v1/lists/:listid/approve', function(req, res, next) {

	var userid = req.user.id; //Get from auth
	var listid = req.params.listid;

	dal.approveInvite(userid, listid, function(err, data) {
		if (err) res.status(500).json(err);
		else res.json(data);
	});

});

//decline an invite
router.put('/api/v1/lists/:listid/decline', function(req, res, next) {

	var userid = req.user.id; //Get from auth
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
	var userid = req.user.id; //Get from auth

	dal.updateListName(listname, listid, userid, function(err, data){
		if (err) res.status(500).json(err);
		else res.json(data);
	});

});

// Get users by email
router.get('/api/v1/lists/:listid/usersearch/:searchString', function(req, res, next) {

	var listid = req.params.listid;
	var emailSubstring = req.params.searchString;

	dal.getUsersByEmail(emailSubstring, listid, function(err, users) {
		if (err) return res.status(500).json(err);
		else return res.json(users);
	});

});

// delete Other user from a list
router.delete('/api/v1/lists/:listid/users/:friendid', function(req, res, next) {

	var userid = req.user.id; //Get from auth
	var listid = req.params.listid;
	var friendid = req.params.friendid;

	dal.deleteOtherUser(friendid, listid, userid, function(err, message) {
		if (err) res.status(500).json(err);
		else res.json(message);
	});

});

router.delete('/api/v1/lists/:listid/pendingusers/:pendinguserid', function(req, res, next) {

	var userid = req.user.id; //Get from auth
	var listid = req.params.listid;
	var pendinguserid = req.params.pendinguserid;

	dal.removePendingUser(pendinguserid, listid, userid, function(err, message) {
		if (err) return res.status(500).json(err);
		else return res.json(message);
	});

});

// Create New Item
router.post('/api/v1/lists/:listid', function(req, res, next) {

	var price = parseFloat(req.body.price);

	if (!req.body.name) return res.status(401).json({message: "Name field is required"});
	if(isNaN(price)) return res.status(401).json({ message: "Amount field must contain a proper number"});

	var userid = req.user.id; //Get from auth
	var listid = req.params.listid;
	var name = req.body.name;
	var price = (price) ? price: 0;
	var recipient = (req.body.recipient) ? req.body.recipient : "";

	dal.createNewItem(listid, name, price, recipient, userid, function(err, message) {
		if (err) return res.status(500).json(err);
		else return res.json(message);
	});

});

// Trash Item
router.put('/api/v1/lists/:listid/items/:itemid/trash', function(req, res, next) {

	var userid = req.user.id; //Get from auth
	var listid = req.params.listid;
	var itemid = req.params.itemid;

	dal.trashItem(itemid, userid, listid, function(err, message) {
		if (err) res.status(500).json(err);
		else res.json(message);
	});

});

// Restore from trash
router.put('/api/v1/lists/:listid/items/:itemid/restore', function(req, res, next) {

	var userid = req.user.id; //Get from auth
	var listid = req.params.listid;
	var itemid = req.params.itemid;

	dal.restoreItem(itemid, userid, listid, function(err, message) {
		if (err) res.status(500).json(err);
		else res.json(message);
	})

});

// Set complete
router.put('/api/v1/lists/:listid/items/:itemid/setcomplete', function(req, res, next) {

	var userid = req.user.id; //Get from auth
	var listid = req.params.listid;
	var itemid = req.params.itemid;

	dal.setItemComplete(itemid, userid, listid, function(err, message) {
		if (err) res.status(500).json(err);
		else res.json(message);
	})

});

router.put('/api/v1/lists/:listid/items/:itemid/setincomplete', function(req, res, next) {

	var userid = req.user.id; //Get from auth
	var listid = req.params.listid;
	var itemid = req.params.itemid;

	dal.setItemIncomplete(itemid, userid, listid, function(err, message) {
		if (err) res.status(500).json(err);
		else res.json(message);
	})

});

module.exports = router;
