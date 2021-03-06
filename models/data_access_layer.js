var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/listbuddy';
var queries = require('./queries');
var bcrypt = require('bcrypt');

var dal = {};

dal.findById = function(id, callback) {
	var user = {};

	pg.connect(connectionString, function(err, client, done) {

		if (err) {
			done();
			return callback(err);
		}

		var query = client.query(queries.getUserById, [id]);

		query.on('row', function(row) {
			user = row;
		});

		query.on('end', function() {
			done();
			if (user) {
				return callback(err, user);
			}
			else return callback(err, {message: 'no such user'});
		})

	})

}

dal.checkIfUserExists = function(email, callback) {

	var result = null;

	pg.connect(connectionString, function(err, client, done) {
		// if error close connection and resturn err
		if (err) {
			done();
			return callback(err, results);
		}
		
		var query = client.query(queries.getUserForAuth, [email]);

		query.on('row', function(row) {
			result = row;
		});

		query.on('end', function() {
			done();
			if (result) return callback(err, true);
			else return callback(err, false);
		});

	});

};

dal.getUserForAuth = function(email, password, callback) {

	var user = {};

	pg.connect(connectionString, function(err, client, done) {
		// if error close connection and resturn err
		if (err) {
			done();
			return callback(err);
		}
		
		var query = client.query(queries.getUserForAuth, [email]);

		query.on('row', function(row) {
			user = row;
		});

		query.on('end', function() {
			done();
			bcrypt.compare(password, user.hpassword, function(err, res) {
				delete user.hpassword; //removes the hpassword before user moves out of dal
		    if (res) return callback(null, user);
		    else return callback(null, false, {message: "Auth Failed."});
			});
		});

	});
};

dal.createNewUser = function(firstname, lastname, email, password, callback) {

	var result = {};
	var hpassword = bcrypt.hashSync(password, 8);

	dal.checkIfUserExists(email, function(err, result) {
		if (result) return callback({message: "Email is Used."}, {});
		else {

			pg.connect(connectionString, function(err, client, done) {
				if (err) {
					done();
					return callback(err, {});
				}

				client.query(queries.createNewUser, [firstname, lastname, email, hpassword]);

				var query = client.query(queries.getUserForAuth, [email]);

				query.on('row', function(row) {
					result = row;
				});
				
				query.on('end', function() {
					done();
					delete result.hpassword;
					return callback(err, result);
				});

			});

		}

	});

};

dal.getListsForUser = function(userid, callback) {

	var lists = [];

	pg.connect(connectionString, function(err, client, done) {
		// if error close connection and resturn err
		if (err) {
			done();
			return callback(err, results);
		}
		
		var query = client.query(queries.getListsForUser, [userid]);

		query.on('row', function(row) {
			lists.push(row);
		});

		query.on('end', function() {
			done();
			return callback(err, lists);
		});

	});

};

dal.getPendingForUser = function(userid, callback) {

	var lists = [];

	pg.connect(connectionString, function(err, client, done) {
		// if error close connection and resturn err
		if (err) {
			done();
			return callback(err, results);
		}
		
		var query = client.query(queries.getPendingForUser, [userid]);

		query.on('row', function(row) {
			lists.push(row);
		});

		query.on('end', function() {
			done();
			return callback(err, lists);
		});

	});

};

dal.getItemsForList = function(listid, userid, callback) {

	var items = [];

	pg.connect(connectionString, function(err, client, done) {
		// if error close connection and resturn err
		if (err) {
			done();
			return callback(err, results);
		}
		
		var query = client.query(queries.getItemsForList, [listid, userid]);

		query.on('row', function(row) {
			items.push(row);
		});

		query.on('end', function() {
			done();
			return callback(err, items);
		});

	});

};

dal.createNewList = function(name, type, userid, callback) {

	pg.connect(connectionString, function(err, client, done) {
		// if error close connection and resturn err
		if (err) {
			done();
			return callback(err, results);
		}

		var query = client.query(queries.createNewList, [name, type, userid]);
		
		query.on('end', function() {
			done();
			return callback(err, {message: "List Added."});
		});

	});

};

dal.deleteSelfFromList = function(userid, listid, callback) {

	pg.connect(connectionString, function(err, client, done) {
		// if error close connection and resturn err
		if (err) {
			done();
			return callback(err, results);
		}

		var query = client.query(queries.deleteSelfFromList, [userid, listid]);
		
		query.on('end', function() {
			done();
			return callback(err, {message: "Removed from list"});
		});

	});

};

dal.getUsersOfAList = function(listid, userid, callback) {

	var users = [];

	pg.connect(connectionString, function (err, client, done) {
		// if error close connection and resturn err
		if (err) {
			done();
			return callback(err, results);
		}

		var query = client.query(queries.getUsersOfAList, [listid, userid]);

		query.on('row', function(row) {
			users.push(row);
		});
		
		query.on('end', function() {
			done();
			return callback(err, users);
		});

	});

};

dal.getPendingOfAList = function(listid, userid, callback) {

	var users = [];

	pg.connect(connectionString, function(err, client, done) {
		if(err) {
			done();
			return callback(err);
		}

		var query = client.query(queries.getPendingOfAList, [listid, userid]);

		query.on('row', function(row) {
			users.push(row);
		});

		query.on('end', function() {
			done();
			return callback(err, users);
		});

	});

};

dal.inviteFriendToList = function(friendid, listid, userid, callback) {

	pg.connect(connectionString, function (err, client, done) {
		// if error close connection and resturn err
		if (err) {
			done();
			return callback(err, results);
		}

		var query = client.query(queries.inviteFriendToList, [friendid, listid, userid]);
		
		query.on('end', function() {
			done();
			return callback(err, {message: "Friend has been added."});
		});

	});

};

dal.approveInvite = function(userid, listid, callback) {

	pg.connect(connectionString, function (err, client, done) {
		// if error close connection and resturn err
		if (err) {
			done();
			return callback(err, results);
		}

		var query = client.query(queries.approveInvite, [userid, listid]);
		
		query.on('end', function() {
			done();
			return callback(err, {message: "Invite has been approved."});
		});

	});

};

dal.declineInvite = function(userid, listid, callback) {

	pg.connect(connectionString, function (err, client, done) {
		// if error close connection and resturn err
		if (err) {
			done();
			return callback(err, results);
		}

		var query = client.query(queries.declineInvite, [userid, listid]);
		
		query.on('end', function() {
			done();
			return callback(err, {message: "Invite has been declined."});
		});

	});

};

dal.updateListName = function(listName, listid, creatorID, callback){

	pg.connect(connectionString, function (err, client, done) {
		// if error close connection and resturn err
		if (err) {
			done();
			return callback(err, results);
		}

		var query = client.query(queries.updateListName, [listName, listid, creatorID]);
		
		query.on('end', function() {
			done();
			return callback(err, {message: "Name has been updated."});
		});

	});

}

dal.getUsersByEmail = function(email, listid, callback) {

	var users = [];

	pg.connect(connectionString, function(err, client, done) {
		// if error close connection and resturn err
		if (err) {
			done();
			return callback(err, results);
		}
		
		var query = client.query(queries.getUsersByEmail, [email, listid]);

		query.on('row', function(row) {
			users.push(row);
		});

		query.on('end', function() {
			done();
			return callback(err, users);
		});

	});

};

dal.deleteOtherUser = function(friendid, listid, userid, callback) {

	pg.connect(connectionString, function (err, client, done) {
		// if error close connection and resturn err
		if (err) {
			done();
			return callback(err, results);
		}

		var query = client.query(queries.deleteOtherUser, [friendid, listid, userid]);
		
		query.on('end', function() {
			done();
			return callback(err, {message: "User has been removed"});
		});

	});

};

dal.removePendingUser = function(pendinguserid, listid, userid, callback) {

	pg.connect(connectionString, function(err, client, done) {
		//if error close connection and return err
		if (err) {
			done();
			return callback(err);
		}

		var query = client.query(queries.removePendingUser, [pendinguserid, listid, userid]);

		query.on('end', function() {
			done();
			return callback(err, {message: "Pending User has been removed"});
		});

	});

};

dal.createNewItem = function(listid, name, price, recipient, creatorid, callback) {

	pg.connect(connectionString, function (err, client, done) {
		// if error close connection and resturn err
		if (err) {
			done();
			return callback(err, results);
		}

		var query = client.query(queries.createNewItem, [listid, name, price, recipient, creatorid]);
		
		query.on('end', function() {
			done();
			return callback(err, {message: "New item has been created."});
		});

	});

}

dal.trashItem = function(itemid, userid, listid, callback) {

	pg.connect(connectionString, function (err, client, done) {
		// if error close connection and resturn err
		if (err) {
			done();
			return callback(err, results);
		}

		var query = client.query(queries.trashItem, [itemid, userid, listid]);
		
		query.on('end', function() {
			done();
			return callback(err, {message: "Item has been flagged for the trash."});
		});

	});

}

dal.restoreItem = function(itemid, userid, listid, callback) {

	pg.connect(connectionString, function (err, client, done) {
		// if error close connection and resturn err
		if (err) {
			done();
			return callback(err, results);
		}

		var query = client.query(queries.restoreItem, [itemid, userid, listid]);
		
		query.on('end', function() {
			done();
			return callback(err, {message: "Item has been flagged for restore."});
		});

	});

}

dal.setItemComplete = function(itemid, userid, listid, callback) {

	pg.connect(connectionString, function (err, client, done) {
		// if error close connection and resturn err
		if (err) {
			done();
			return callback(err, results);
		}

		var query = client.query(queries.setItemComplete, [itemid, userid, listid]);
		
		query.on('end', function() {
			done();
			return callback(err, {message: "Item has been flagged as complete."});
		});

	});

}

dal.setItemIncomplete = function(itemid, userid, listid, callback) {

	pg.connect(connectionString, function (err, client, done) {
		// if error close connection and resturn err
		if (err) {
			done();
			return callback(err, results);
		}

		var query = client.query(queries.setItemIncomplete, [itemid, userid, listid]);
		
		query.on('end', function() {
			done();
			return callback(err, {message: "Item has been flagged as incomplete."});
		});

	});

}



module.exports = dal;





















