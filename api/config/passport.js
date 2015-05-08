module.exports = function(passport, LocalStrategy, User){

passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err, user);
	});
});

//--passport_local--//
passport.use(new LocalStrategy(
	function(username, password, done) {
		User
			.findOne({ username: username }, function(err, user) {
		if(err) { return done(err); }
		if (!user) {
			return done(null, false, { message: 'Incorrect username' });
		}
		user.comparePassword(password)
			.then(function(isMatch){
					if(!isMatch){
						return done(null, false, {message: 'Incorrect password'});
					}
					return done(null, user);
				});
		});
}));




};
