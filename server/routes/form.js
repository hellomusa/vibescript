const express = require('express');
const router = express.Router();

router.post("/form/callback", (req, res) => {
  console.log(req.body);
  req.body.form_response.answers.forEach((elem) => {
    console.log(elem);
  })
  res.end();
});

module.exports = router;