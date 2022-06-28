const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth');
const Candidate = require('../models/candidate')
const Voter = require('../models/voter')
const User = require('../models/user')
const cors = require('cors');
const getVotesRemaining = require('../helpers/getBalance');

// get user balance
router.get("/:id", cors(), async (req, res, next) => {
  try {
    console.log("abt to get balance");
    var temp = await User.findOne({userId: req.params.id});
    if (!temp) {
      return res.status(400).send("User doesn't exist")
    }
    var user = temp.role === "voter" ? await Voter.findById(req.params.id) : await Candidate.findById(req.params.id) 
    const balance  = await getVotesRemaining(user.uniqueID);
    res.json(balance).status(200);
  } catch (e) {
    return res.send("Can't get Balance").status(500);
  }
});

module.exports = router;