const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth');
const Candidate = require('../models/candidate')
const Pending  = require("../models/pending");
const Voter = require('../models/voter')
const User = require('../models/user')
const upload = require('../middleware/upload')
const bcrypt = require('bcryptjs')
var generator = require('generate-password');
const cors = require('cors');
const Blacklist = require('../models/blacklist');
const { send_password } = require("./emailController");
const generateAddress = require('../helpers/generateAddress');
const blacklistCandidate = require('../helpers/blacklistCandidate');


//get all candidates
router.get('/', cors(), async (req, res, next) => {
  try {
    let query = {}
    if (req.query.query) {
      query.$or = [
        { "name": { $regex: req.query.query, $options: 'i' } },
      ]
    }
    var candidates = await Candidate.find(query);
    res.json(candidates);
  } catch (e) {
    res.json({
      status: 'err',
      code: 500,
      message: e,
    });
  }
});

// get candidate detail
router.get("/:id", cors(), async (req, res, next) => {
  try {
    var candidate = await Candidate.findById(req.params.id);
    res.json({
      status: "success",
      code: 200,
      data: candidate,
    });
  } catch (e) {
    res.json({
      status: "failed",
      code: 500,
      message: "Candidate doesn't exist!",
    });
  }
});

//disqualify
router.patch("/", cors(), async function (req, res, next) {
  const candidate = await Candidate.findOne({ email: req.body.email });
  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(candidate._id, {
      status: !candidate.status,
    });
    res.send(updatedCandidate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//complete profile
router.patch("/complete/:id", cors(), async function (req, res, next) {
  console.log("Got here", req.body)
  try {
    const updatedCandidate = await Candidate.findByIdAndUpdate(req.params.id, {
      completed: true,
      bio: req.body.bio,
      plans: req.body.plans,
      profile: req.file ? req.file.path.substring(8) : ""
    });
    return res.send(updatedCandidate).status(200);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", cors(), async function (req, res, next) {
  try {
    const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);
    await blacklistCandidate(deletedCandidate.uniqueID);
    await User.remove({userId: req.params.id});
    const blacklist = new Blacklist({
      userId: deletedCandidate._id,
      fullName: deletedCandidate.fullName,
      studId: deletedCandidate.id
    })
    const newBlacklist = await blacklist.save()
    res.send(newBlacklist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//add new candidate
router.post(
  "/",
  upload.single("profile"),
  async function (req, res, next) {
    const uniqueID = await generateAddress();
    const candidate = new Candidate({
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
      uniqueID: uniqueID,
    });
    
    try {
      var check = await User.findOne({ email: req.body.email });
      if (check) {
        return res.status(404).send("User Already Exists!");
      }
      check = await Candidate.findOne({ id: req.body.id });
      if (check) {
        return res.status(404).send("User Already Exists!");
      }
      check = await Voter.findOne({ id: req.body.id });
      if (check) {
        return res.status(404).send("User Already Exists!");
      }

      const newCandidate = await candidate.save();
      const pending = new Pending({
        userId: newCandidate._id,
        name: newCandidate.name,
        fname: newCandidate.fname,
        gname: newCandidate.gname,
        email: newCandidate.email,
        phone: newCandidate.phone,
        id: newCandidate.id,
        dept: newCandidate.dept,
        year: newCandidate.year,
        section: newCandidate.section,
        fullName: newCandidate.fullName,
        role: "candidate"
      });
      const salt = await bcrypt.genSalt(10);
      const user = new User({
        userId: newCandidate._id,
        phone: newCandidate.phone,
        email: newCandidate.email,
        role: "candidate",
      });
      user.password = await bcrypt.hash(req.body.password, salt);
      await pending.save();
      await user.save();
      res.json(newCandidate).status(201)
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);
module.exports = router;
