const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/passportapp', {useMongoClient : true});

// user schema
const UserSchema = mongoose.Schema({
	name : { type: String },
	username : { type : String },
	email : { type: String },
	password : { type : String}
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.registerUser = function(newUser, callback) {
	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) {
				console.log(err);
			}

			newUser.password = hash;
			newUser.save(callback);
		});
	});
}