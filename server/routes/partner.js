const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const User = require('../models/User');

router.get("/partner", ensureAuthenticated, async (req, res) => {
    let user = await User.findOne({discordID: req.user.id});
    if (user.partnerID != ""){
        res.send({201: "you already have a patrner"});
    }

    let users = await User.find();

    users.forEach(elem => {
        if ((elem != user) && (elem.partnerID == "") && (elem.discordID != user.discordID)){
            user.partnerID = elem.discordID;
            elem.partnerID = user.discordID;
            elem.save();
            user.save();
            res.send({200: "success"});
        };
    });
});

module.exports = router;