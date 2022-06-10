const express = require("express");
const router = express.Router();
const Voter = require("../models/voter");
const Pending = require("../models/pending");
const Candidate = require("../models/candidate");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
var cors = require("cors");

//get all users waiting for approval
router.get("/", cors(), async (req, res, next) => {
  try {
    var pending = await Pending.find();
    res.json(pending);
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
  const pending = new Pending({
    name: req.body.name,
    fname: req.body.fname,
    gname: req.body.gname,
    email: req.body.email,
    phone: req.body.phone,
    id: req.body.id,
    dept: req.body.dept,
    section: req.body.section,
    year: req.body.year
  });
  try {
    var check = await User.findOne({ email: req.body.email });
    if (check) {
      return res.status(404).send("User Already Exists!");
    }
    check = await Pending.findOne({ email: req.body.email, id: req.body.id });
    if (check) {
      return res.status(404).send("User already in the pending list!");
    }
    check = await Voter.findOne({ id: req.body.id });
    if (check) {
      return res.status(404).send("User Already Exists!");
    }
    check = await Candidate.findOne({ id: req.body.id });
    if (check) {
      return res.status(404).send("User Already Exists!");
    }

    const newPending = await pending.save();
    return res.json(newPending).status(201)
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// get pending user detail
router.get('/:id', async (req, res, next) => {
  try {
    var pending = await Pending.findOne({ _id: req.params.id });
    res.json({
      status: 'success',
      code: 200,
      data: pending
    })

  } catch (e) {
    res.json({
      status: "failed",
      code: 500,
      message: "User doesn't exist!"
    })
  }
});

//approve user
router.delete('/:id', async (req, res, next) => {
  try {
    const approvedUser = await Pending.findByIdAndDelete(req.params.id);
    if (!approvedUser) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }
    const voter = new Voter({
      name: approvedUser.name,
      fname: approvedUser.fname,
      gname: approvedUser.gname,
      email: approvedUser.email,
      phone: approvedUser.phone,
      id: approvedUser.id,
      dept: approvedUser.dept,
      year: approvedUser.year,
      section: approvedUser.section,
      fullName: approvedUser.name + " " + approvedUser.fname + " " + approvedUser.gname
    })
    const newVoter = await voter.save()
    const salt = await bcrypt.genSalt(10);
    const user = new User({
      userId: newVoter._id,
      email: newVoter.email,
      role: "voter",
    });
    user.password = await bcrypt.hash("password", salt);
    await user.save();
    return res.status(201).json(newVoter);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;