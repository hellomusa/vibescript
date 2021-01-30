const express = require("express"),
    session = require("express-session"),
    passport = require("passport"),
    Strategy = require("./lib").Strategy,
    app = express();

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

const scopes = ["identify"];
const prompt = "consent"

passport.use(new Strategy({
    clientID: "805188698253688843",
    clientSecret: "wc0S7ecUZLwxhebzU-EfqGqExwwrUGaI",
    callbackURL: "http://localhost:5000/callback",
    scope: scopes,
    prompt: prompt
    }, (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => {
        return done(null, profile);
    });
}));

app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/login", passport.authenticate("discord", {
    scope: scopes,
    prompt: prompt
}), (req, res) => {});

app.get("/callback",
    passport.authenticate("discord", {
        failureRedirect: "/"
    }),
    (req, res) => {
        res.redirect("/info")
    } // auth success
);

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.send("you\'re not logged in");
}

app.get("/info", ensureAuthenticated, (req, res) => {
    res.json(req.user);
});

app.listen(5000, err => {
    if (err) return console.log(err)
    console.log("Listening at http://localhost:5000/")
})