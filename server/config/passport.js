  
const Strategy = require("../lib").Strategy;

// OAuth Config
const discordClientID = require('./keys').discordClientID;
const discordClientSecret = require('./keys').discordClientSecret;
const discordCallbackURL = require('./keys').discordCallbackURL;


// Load User model
//const User = require('../models/User');

const scopes = ["identify"];
const prompt = "consent";

module.exports = function(passport) {
    passport.use(new Strategy({
        clientID: discordClientID,
        clientSecret: discordClientSecret,
        callbackURL: discordCallbackURL,
        scope: scopes,
        prompt: prompt
        }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            return done(null, profile);
        });
    }));
    
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    
    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });
};