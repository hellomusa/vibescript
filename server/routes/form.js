const express = require('express');
const router = express.Router();
const User = require('../models/User');
const fetch = require("node-fetch");

router.post("/form/:id", async (req, res) => {
    const formID = req.params.id
    const responseID = req.body.responseID
    let user = await User.findOne({discordID: req.user.id});
    user.formID = formID;
    const token = "DVGXbpjTfJbe34rXfhn3EnkRrJYRvLPV9fyTpS2n1NL5";
    user.save();
    fetch(`https://api.typeform.com/forms/${formID}/responses`, {
    method: 'POST',
    headers: {
      'authorization': `bearer ${token}`
    }}).then(res => console.log(res));
    res.send(200);
});

module.exports = router;