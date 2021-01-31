const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		default: ""
	},
	discordID: {
		type: String,
		required: true,
		unique: true
	},
	partnerID:{
		type: String,
		default: ""
	},
	github: {
		type:String,
		default: ""
	},
	spotify: {
		type: String,
		default: ""
	},
	denylist: {
		type: [String],
		default: []
	},
	formID: {
		type: String,
		default: ""
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;