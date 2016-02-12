var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var dal = require('./models/data_access_layer');

passport.use(new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password'
	},

	function(username, password, done) {

		dal.getUserForAuth(username, password, done);

	})
);

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	dal.findById(id, function(err, user) { //create this function in the dal
		done(err, user);
	});
});