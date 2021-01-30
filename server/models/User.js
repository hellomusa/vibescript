const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	discordID: {
		type: String,
		required: true
	},
	partnerID:{
		type: String,
		default: ''
	},
	github: {
		type:String,
		default: ''
	},
	spotify: {
		type: String,
		default: ''
	},
	denylist: {
		type: [String],
		default: []
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
