const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User');

const scopes = ["identify"];
const prompt = "consent";

router.get("/callback",
    passport.authenticate("discord", {
        failureRedirect: "/"
    }),
    async (req, res) => {
        let user = await User.findOne({
            discordID: req.user.id
        });

        if (!user) {
            user = new User(
                {
                    discordID: req.user.id 
                }
            );
            user.save();
        }
		res.send({200: "you can close this tab now :)"});
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