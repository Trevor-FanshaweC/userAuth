const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const validator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

const PORT = 3000;

// routes
const index = require('./routes/index');
//const users = require('./routes/users');

const app = express();

//set the rendering engine to handlebars
app.engine('handlebars', handlebars({defaultLayout : 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//express session middleware
app.use(session({
	secret : 'secret',
	saveUninitialized : true,
	resave : true
}));

//express messages
app.use(flash());
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	next();
});

// express validator
app.use(validator({
	errorFormatter: (param, msg, value) => {
		var namespace 	= param.split('.'),
			root 		= namespace.shift(),
			formParam	= root;

		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}

		return {
			param : formParam,
			msg : msg,
			value : value
		}
	}
}));

// routes
app.use('/', index);
//app.use('/users', users);

app.listen(PORT, () => {
	console.log('server started on port ' + PORT);
});

