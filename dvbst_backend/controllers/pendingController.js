const express = require("express");
const router = express.Router();
const Voter = require("../models/voter");
const Pending = require("../models/pending");
const Candidate = require("../models/candidate");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { send_notification } = require("./emailController");
const generateAddress = require('../helpers/generateAddress');

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

// get pending user detail
router.get('/:id', cors(), async (req, res, next) => {
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
router.delete('/approve/:id', cors(), async (req, res, next) => {
  try {
    const approvedUser = await Pending.findByIdAndDelete(req.params.id);
    if (!approvedUser) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }
    const uniqueID = await generateAddress();
    await Voter.deleteOne({ _id: approvedUser.userId })
    const candidate = new Candidate({
      name: approvedUser.name,
      fname: approvedUser.fname,
      gname: approvedUser.gname,
      fullName: approvedUser.name + " " + approvedUser.fname + " " + approvedUser.gname,
      email: approvedUser.email,
      phone: approvedUser.phone,
      id: approvedUser.id,
      dept: approvedUser.dept,
      section: approvedUser.section,
      year: approvedUser.year,
      role: approvedUser.role,
      bio: approvedUser.bio,
      plans: approvedUser.plans,
      uniqueID: uniqueID,
    });

    const newCandidate = await candidate.save()
    await User.updateOne({ userId: approvedUser.userId }, { $set: { userId: newCandidate._id, role: "candidate"} })
    // const userApproved = await Candidate.updateOne({ _id: approvedUser.userId }, { $set: { approved: true } })
    return res.status(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//decline user
router.delete('/decline/:id', cors(), async (req, res, next) => {
  try {
    const declinedUser = await Pending.findByIdAndDelete(req.params.id);
    if (!declinedUser) {
      return res.status(400).json({ message: "User doesn't exist!" });
    }
    await send_notification(declinedUser.email);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;