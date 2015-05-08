//--node_modules--//
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


//--internal modules--//
var env = require('./.envVar');
var User = require('./models/userModel');
var UserController = require('./controllers/userController');
var AuthController = require('./controllers/userController');

//--app variables--//
var app = express();
var port = env.PORT || 10000;

//--middleware--//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: ''
}));
app.use(passport.initialize());
app.use(passport.session());

//--passport--//
require('./pass.js')(passport, LocalStrategy, User);

//--routes--//


//--connections--//
app.listen(port, function(){
	console.log('Listening on port: ', port);
});

mongoose.connect('mongodb://localhost/')