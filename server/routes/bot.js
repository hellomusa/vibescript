const express = require('express');
const router = express.Router();

const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');
const { route } = require('./api');

router.post("/leave/:id", async(req, res) => {

	let user = await User.find({"discordID" : req.params.id})
	
	User.findOneAndUpdate(
		{'discordID': user.partnerID },
		{ $set: { 'partnerID': '' } },

		err => {
			if(err){
				return res.status(422).send(err);
			}
		}
	);

	User.findByIdAndUpdate(
		{'discordID': user.discordID},
		{ $set: { 'partnerID': ''} },

		err => {
			if(err){
				return res.status(422).send(err);
			}
		}
	);

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
