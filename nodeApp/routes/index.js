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
router.get('/api/v1/lists/:id/items', function(req, res, next) {

	var userid = 1; //Get from session auth
	var listid = req.params.id;

	dal.getItemsForList(listid, userid, function(err, items) {
		if (err) res.status(500).json(err);
		else res.json(items);
	})

});

//Create new list
// Get all lists for current user
router.post('/api/v1/lists', function(req, res, next) {

	var userid = 1; //Get from auth
	var name = req.body.name;
	var type = req.body.type;

	dal.createNewList(name, type, userid, function(err, response) {

		if (err) res.status(500).json(err);
		else res.json(response);

	});

});

module.exports = router;
