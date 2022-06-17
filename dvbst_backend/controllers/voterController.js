const express = require("express");
const router = express.Router();
const Voter = require("../models/voter");
const Candidate = require("../models/candidate");
const Pending  = require("../models/pending");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
var cors = require("cors");

//get all voters
router.get("/", cors(), async (req, res, next) => {
  // await Voter.deleteOne({email: "rahelayeled@gmail.com"});
  // await User.deleteOne({email: "rahelayeled@gmail.com"});

  try {
    let query = {};
    if (req.query.query) {
      query.$or = [{ name: { $regex: req.query.query, $options: "i" } }];
    }
    var voters = await Voter.find(query);
    console.log(voters);
    res.json(voters);
  } catch (e) {
    res.json({
      status: "err",
      code: 500,
      message: e,
    });
  }
});

//add new voter
router.post("/", async function (req, res, next) {
  const voter = new Voter({
    name: req.body.name,
    fname: req.body.fname,
    gname: req.body.gname,
    fullName: req.body.name + " " + req.body.fname + " " + req.body.gname,
    email: req.body.email,
    phone: req.body.phone,
    id: req.body.id,
    dept: req.body.dept,
    section: req.body.section,
    year: req.body.year,
  });
  try {
    var check = await User.findOne({ email: req.body.email });
    if (check) {
      return res.status(404).send("User Already Exists!");
    }
    check = await Voter.findOne({ id: req.body.id });
    if (check) {
      return res.status(404).send("User Already Exists!");
    }
    check = await Candidate.findOne({ id: req.body.id });
    if (check) {
      return res.status(404).send("User Already Exists!");
    }
    const newVoter = await voter.save();
    const pending = new Pending({
      userId: newVoter._id,
      name: newVoter.name,
      fname: newVoter.fname,
      gname: newVoter.gname,
      email: newVoter.email,
      phone: newVoter.phone,
      id: newVoter.id,
      dept: newVoter.dept,
      year: newVoter.year,
      section: newVoter.section,
      fullName: newVoter.fullName,
      role: "voter"
    });
    const salt = await bcrypt.genSalt(10);
    const user = new User({
      userId: newVoter._id,
      phone: newVoter.phone,
      email: newVoter.email,
      role: "voter",
    });
    user.password = await bcrypt.hash(req.body.password, salt);
    await user.save();
    await pending.save();
    res.json({
      status: "success",
      code: 201,
      message: "Voter Added",
      data: newVoter,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get voter detail
router.get('/:id', async (req, res, next) => {
  try {
      var voter = await Voter.findOne({_id: req.params.id});
      res.json({
          status: 'success',
          code: 200,
          data: voter
      })

  } catch (e) {
      res.json({
          status: "failed",
          code: 500,
          message: "Voter doesn't exist!"
      })
  }
});
module.exports = router;
