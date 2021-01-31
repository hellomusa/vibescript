const express = require('express');
const router = express.Router();

const User = require('../models/User');

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
	let thisuser = await User.find({'discordID': req.params.id});

	console.log(thisuser);

	if(!thisuser.length){
		return res.status(404).send("User is not registered");
	}
	return res.status(200).send(thisuser);
});

module.exports = router;
