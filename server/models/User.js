const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		default: ""
	},
	discordID: {
		type: String,
		required: true
	},
	partnerID:{
		type: String,
		default: ""
	},
	github: {
		type:String,
		default: ""
	},
	genres: {
		type: String,
		default: ""
	},
	denylist: {
		type: [String],
		default: []
	},
	responseID: {
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