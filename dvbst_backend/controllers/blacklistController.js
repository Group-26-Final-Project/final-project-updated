const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth');
const hasRole = require('../middleware/hasRole');
const Candidate = require('../models/candidate')
const cors = require('cors');
const Blacklist = require('../models/blacklist');

//get all blacklisted candidates
router.get('/', cors(), auth, hasRole(["admin"]), async (req, res, next) => {
  try {
    var candidates = await Blacklist.find();
    res.json(candidates);
  } catch (e) {
    res.json({
      status: 'err',
      code: 500,
      message: e,
    });
  }
});
module.exports = router;
