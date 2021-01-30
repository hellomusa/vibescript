const express = require("express")
const session = require("express-session")
const passport = require("passport")
const mongoose = require("mongoose")

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Express body parser
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api', require('./routes/api.js'));

app.listen(5000, err => {
    if (err) return console.log(err)
    console.log("Listening at http://localhost:5000/")
})