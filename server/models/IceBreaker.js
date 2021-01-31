const mongoose = require("mongoose");

const IceBreakerSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true
	}
});

const IceBreaker = mongoose.model("IceBreaker", IceBreakerSchema);

module.exports = IceBreaker;