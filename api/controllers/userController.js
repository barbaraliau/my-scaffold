var User = require('../models/userModel');

module.exports = {
	profile: function(req, res) {
		User
			.findOne({_id: req.user._id})
			.exec()
			.then(function(user){
				return res.json(user);
		});
	},

	update: function(req, res) {
		console.log(req.body);
		User
			.findOneAndUpdate
			({ _id: req.user._id },
				{$push: {savedOutfits: req.body}},
				{safe: true, upsert: true},
				function(err, model){
					if(!err){
						return res.status(200).end();
				}
			});
	}
};//end