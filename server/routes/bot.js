const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');
const { route } = require('./auth');

router.post("/leave/:id", async(req, res) => {

	let user = await User.findOne({
		discordID : req.params.id
	})

	let partner = await User.findOne({
		discordID : user.partnerID
	})

	user.partnerID = "";
	user.save();
	partner.partnerID = "";
	partner.save();

	res.status(201).json({success: true})
});

router.get("/user/:id", async(req, res) => {
	let user = await User.find({'discordID': req.params.id});

	if(user == undefined){
		res.status(404).send("User is not registered");
	}
	res.status(200).json(user);
});

module.exports = router;
