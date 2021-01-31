const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const User = require('../models/User');

router.get("/partner", ensureAuthenticated, async (req, res) => {
    let user = await User.findOne({discordID: req.user.id});
    while (user.partnerID == "") {
        let partner = await User.findOne({partnerID: ""});
        if (partner && (partner != user)) {
            user.partnerID = partner.discordID;
            partner.partnerID = user.discordID;
            partner.save();
            user.save();
            res.send({200: "success"});
            return;
        }
    }
    res.send({500: "server error, couldn't find a partner"})
});

module.exports = router;