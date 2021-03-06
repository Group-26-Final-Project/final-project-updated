const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth');
const hasRole = require('../middleware/hasRole');
const Candidate = require('../models/candidate')
const Election = require('../models/election')
const Pending  = require("../models/pending");
const Voter = require('../models/voter')
const User = require('../models/user')
const upload = require('../middleware/upload')
const bcrypt = require('bcryptjs')
const cors = require('cors');
const Blacklist = require('../models/blacklist');
const { send_password } = require("./emailController");
const generateAddress = require('../helpers/generateAddress');
const blacklistCandidate = require('../helpers/blacklistCandidate');
const logger = require("../helpers/logger");


//get all candidates
router.get('/', cors(), async (req, res, next) => {
  try {
    // console.log("abt to get candidates")
    let query = {}
    if (req.query.query) {
      query.$or = [
        { "name": { $regex: req.query.query, $options: 'i' } },
      ]
    }
    var candidates = await Candidate.find(query);
    res.status(200).json(candidates);
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

//blacklist
router.delete("/:id", cors(), async function (req, res, next) {
  try {
    // console.log("am here");
    // console.log(req.params.id);
    const deletedCandidate = await Candidate.findByIdAndDelete(req.params.id);
    await Election.updateMany({}, { $pull: { candidates: { _id: req.params.id } } });
    await blacklistCandidate(deletedCandidate.uniqueID);
    await User.deleteOne({userId: req.params.id});
    const blacklist = new Blacklist({
      userId: deletedCandidate._id,
      fullName: deletedCandidate.fullName,
      studId: deletedCandidate.id
    })
    const newBlacklist = await blacklist.save()
    res.send(newBlacklist).status(200);
    return logger.info(`200 || ${res.statusMessage} - Candidate ${deletedCandidate.fullName} Blacklist Successful `);

  } catch (error) {
    res.status(400).json({ message: error.message });
    return logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} Blacklist ${deletedCandidate.fullName} Failed`);

  }
});

//add new candidate
router.post(
  "/",
  cors(),
  upload.single("profile"),
  async function (req, res, next) {
    try {
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
        bio: req.body.bio,
        plans: req.body.plans,
        uniqueID: uniqueID,
      });
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
        phone: newCandidate.phone,
        email: newCandidate.email,
        role: "candidate",
      });
      user.password = await bcrypt.hash(req.body.password, salt);
      await user.save();
      res.json(newCandidate).status(201)
      return logger.info(`200 || ${res.statusMessage} Candidate Add Successful `);

    } catch (err) {
      res.status(400).json({ message: err.message });
      return logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} Candidate Add Failed`);

    }
  }
);
module.exports = router;
