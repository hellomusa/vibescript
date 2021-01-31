const express = require('express');
const router = express.Router();
const User = require('../models/User');
const fetch = require("node-fetch");

router.post("/form/:id", async (req, res) => {
    // unique form submission ID
    const responseID = req.params.id
    console.log(responseID);

    let user = await User.findOne({discordID: req.user.id});
    user.responseID = responseID;

    const token = "DVGXbpjTfJbe34rXfhn3EnkRrJYRvLPV9fyTpS2n1NL5";

    setTimeout(() => {
      fetch('https://api.typeform.com/forms/GMdc1yP5/responses?' + new URLSearchParams({
      included_response_ids: responseID,
      }), {
            method: 'GET',
            headers: {
            'authorization': `bearer ${token}`
    }}).then(res => res.json())
    .then(resJson => {
      const responses = resJson.items[0].answers;
      responses.forEach((elem) => {
        if (elem.type == 'text') {
          user.name = elem.text;
        }
        if (elem.type ==  'url') {
          user.github = elem.url;
        }
        if (elem.type == 'choices') {
          user.genres = elem.choices.labels;
        }
      })
      user.save();
    });
    }, 1000)

    
    res.send(200);
});

module.exports = router;