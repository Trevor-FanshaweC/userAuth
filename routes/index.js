var express = require('express');
var router = express.Router();

let User = require('../models/user');

// serve the home page
router.get('/', (req, res, next) => {
	res.render('index');
});

// render the login form
router.get('/login', (req, res, next) => {
	res.render('login');
});

// register form
router.get('/register', (req, res, next) => {
	res.render('register');
});

// process register form
router.post('/register', (req, res, next) => {
	const name = req.body.name;
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;
	const password2 = req.body.password2;
	//res.render('register');

	req.checkBody('name', 'Name field is required').notEmpty();
	req.checkBody('email', 'Name field is required').notEmpty();
	req.checkBody('email', 'Must be a valid email').isEmail();
	req.checkBody('username', 'Username field is required').notEmpty();
	req.checkBody('password', 'Password field is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	let errors = req.validationErrors();

	if (errors) {
		res.render('register', {
			errors : errors
		});
	} else {
		const newUser = User({
			name : name,
			username : username,
			email : email,
			password : password
		});

		User.registerUser(newUser, (err, user) => {
			if (err) throw err;
			req.flash('success_msg', 'Successfully Registered! Log in.');
			res.redirect('/login');
		});
	}
});

module.exports = router;