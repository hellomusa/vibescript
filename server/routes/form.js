const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get("/form/:id", async (req, res) => {
    let user = await User.findOne({discordID: req.user.id});
    user.formID = req.params.id;
    user.save();
    res.send(200);
});

router.post("/form/callback", (req, res) => {
  console.log(req.body);
  req.body.form_response.answers.forEach((elem) => {
    console.log(elem);
  })
  res.end();
});

module.exports = router;