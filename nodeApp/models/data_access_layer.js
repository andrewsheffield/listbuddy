var pg = require('pg');
var connectionString = 'postgres://localhost:5432/listbuddy';
var queries = require('./queries');

var dal = {};

dal.getUsers = function(passedFunction) {
	var results = [];

	pg.connect(connectionString, function(err, client, done) {
		if (err) passedFunction(err, results);
		
		var query = client.query(queries.getUserForAuth, ['andrew@test.com', 'alskdfjlfjksa']);

		query.on('row', function(row) {
			results.push(row);
		});

		query.on('end', function() {
			passedFunction(err, results);
		});

	});
}

module.exports = dal;