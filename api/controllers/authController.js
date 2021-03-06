var User = require('../models/userModel')

module.exports = {

	register: function(req, res){
		var newUser = new User(req.body);
		newUser
			.save(function(err, user){
				if(err){
					console.log(err);
					var error = err.code;
					return res.send(error).end();
				} else {
					req.logIn(user, function(err){
						if(!err){
							res.send(200, user);
						}
					});
				}
		});
	},

	login: function(req, res) {
		var userInfo = {
			name: req.user.name,
			username: req.user.username,
			email: req.user.email
		};
		res.send(200, userInfo);
	},

	logout: function(req, res){
		req.logout();
		res.redirect('/');
	}
};//end