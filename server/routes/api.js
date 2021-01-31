const express = require('express');
const router = express.Router();
const passport = require('passport');

const { ensureAuthenticated } = require('../config/auth');
const User = require('../models/User');

const scopes = ["identify"];
const prompt = "consent";

router.get("/callback",
    passport.authenticate("discord", {
        failureRedirect: "/"
    }),
    (req, res) => {
		let user = new User(
			{
				discordID: req.user.id 
			}
		);
		user.save();
		res.redirect("/");
		
    }
);

router.get("/login", passport.authenticate("discord", {
    scope: scopes,
    prompt: prompt
}), (req, res) => {

});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

router.get("/info", ensureAuthenticated, (req, res) => {
    res.json(req.user);
});

module.exports = router;