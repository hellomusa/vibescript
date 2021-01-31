const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const IceBreaker = require('../models/IceBreaker');

router.get("/icebreaker", ensureAuthenticated, (req, res) => {
    IceBreaker.countDocuments((err, count) => {
        let random = Math.floor(Math.random() * count)
        IceBreaker.findOne().skip(random).exec((err, result) => {
            res.json(result);
          });
      });
});

module.exports = router;