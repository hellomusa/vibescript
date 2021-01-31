const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post("/form/:id", async (req, res) => {
    console.log(req);
    let user = await User.findOne({discordID: req.user.id});
    user.formID = req.params.id;
    user.save();
    res.send(200);
});

router.post("/form/callback", async (req, res) => {
  console.log(req.body);
  let token = req.body.form_response.token;
  let user = await User.findOne({formID: token});
  req.body.form_response.answers.forEach((elem) => {
    if (elem.type == 'text') {
      user.name = elem.text;
    }
    if (elem.type ==  'url') {
      user.github = elem.url;
    }
    if (elem.type == 'choices') {
      user.genres = elem.choices.labels;
    }
    user.save();
  })
  res.send(200);
});

module.exports = router;