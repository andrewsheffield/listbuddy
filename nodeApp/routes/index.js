var express = require('express');
var router = express.Router();
var dal = require('../models/data_access_layer');



/* GET home page. */
router.get('/', function(req, res, next) {

  dal.getUsers(function(err, data) {
  	if (err) res.json(err);
  	else res.json(data);
  });
  
});

router.get('/api/v1/users', function(req, res) {

	var results = [];

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}
		
		var query = client.query("SELECT * FROM users;");

		query.on('row', function(row) {
			results.push(row);
		});

		query.on('end', function() {
			done();
			return res.json(results);
		});

	});


});

module.exports = router;
