const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User');

const scopes = ["identify"];
const prompt = "consent";

router.get("/authenticated", (req, res) => {
    const authenticated = typeof req.user !== 'undefined';

    res.status(200).json({
        authenticated,
    });
});

router.get("/callback",
    passport.authenticate("discord", {
        failureRedirect: "/"
    }),
    async (req, res) => {
        let user = await User.findOne({
            discordID: req.user.id
        });

        if (!user) {
            user = new User({
                discordID: req.user.id
            });
            user.save();
        }
		res.redirect("/");
    }
);

router.get("/login", passport.authenticate("discord", {
    scope: scopes,
    prompt: prompt
}), (req, res) => {});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;