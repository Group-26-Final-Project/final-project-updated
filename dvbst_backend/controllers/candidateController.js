const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth');
const Candidate = require('../models/candidate')
const Voter = require('../models/voter')
const User = require('../models/user')
const upload = require('../middleware/upload')
const bcrypt = require('bcryptjs')
const cors = require('cors')

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

//add new candidate
router.post(
  "/",
  upload.single("profile"),
  async function (req, res, next) {
    const candidate = new Candidate({
      name: req.body.name,
      fname: req.body.fname,
      gname: req.body.gname,
      fullName: req.body.name + " " + req.body.fname + " " + req.body.gname,
      email: req.body.email,
      id: req.body.id,
      dept: req.body.dept,
      section: req.body.section,
      year: req.body.year,
      wallet: req.body.wallet,
      bio: req.body.bio,
    });
    if (req.file) {
      candidate.profile = req.file.path.substring(8);
    }
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
      const salt = await bcrypt.genSalt(10);
      const user = new User({
        userId: newCandidate._id,
        email: newCandidate.email,
        role: "candidate",
      });
      user.password = await bcrypt.hash("password", salt);
      await user.save();

      res.json({
        status: "success",
        code: 201,
        message: "Candidate Added",
        data: newCandidate,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);
module.exports = router;
