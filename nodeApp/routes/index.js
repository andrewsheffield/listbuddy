var express = require('express');
var router = express.Router();
var dal = require('../models/data_access_layer');



/* GET home page. */
router.get('/', function(req, res, next) {

	res.send("Hello");

});

router.post('/api/v1/user/login', function(req, res, next) {

	var email = req.body.email;
	var password = req.body.password;

	dal.getUserForAuth(email, password, function(err, user) {
		if (err) res.json(err);
		else res.json(data);
	});

});

router.post('/api/v1/user/create', function(req, res, next) {

	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	var email = req.body.email;
	var password = req.body.password;

	dal.createNewUser(firstname, lastname, email, password, function(err, data) {
  	if (err) res.json(err);
  	else res.json(data);
  });
});

router.get('/api/v1/lists', function(req, res, next) {

	var userid = 1; //Get from auth

	dal.getListsForUser(userid, function(err, lists) {

		if (err) res.json(err);
		else res.json(lists);

	});

});

module.exports = router;
