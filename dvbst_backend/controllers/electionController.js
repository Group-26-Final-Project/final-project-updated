const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Election = require("../models/election");
const Voter = require("../models/voter");
const Candidate = require("../models/candidate");
const User = require("../models/user");
const CompletedElections = require("../models/completed");
const ArchivedElections = require("../models/archive");
var cors = require("cors");
const getPersonalizedElection = require("../helpers/getPersonalizedElection");
const jwt = require('jsonwebtoken')
const config = require('../config');
const { vote } = require("../helpers/vote");

const deptTypes = [
  "Software Engineering",
  "Biomedical Engineering",
  "Chemical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
];
//get all elections
router.get("/", cors(), async (req, res, next) => {
  try {
    var elections = await Election.find();
    if(elections.length === 0) elections = await CompletedElections.find();
    if(elections.length === 0) {
      const temp = await ArchivedElections.find({year:2022});
      elections = temp.elections;
  }
    return res.json(elections).status(200);
  } catch (e) {
    return res.json(e).status(400);
  }
});

// get election detail
router.get("/details/:id", cors(), async (req, res, next) => {
  try {
    var election = await Election.findById(req.params.id);
    const voters = await Voter.find({
      dept: 0,
      year: 5,
      section: 2,
    });
    election.voters = voters;
    console.log(election);

    return res.json({
      status: "success",
      code: 200,
      data: election,
    });
  } catch (e) {
    return res.json({
      status: "failed",
      code: 500,
      message: "Election doesn't exist!",
    });
  }
});

router.get("/myelection/:id", cors(), async (req, res, next) => {
  try {
    var token = req.headers.authorization;
    token = token.split(" ")[1];
    var decoded = jwt.decode(token, config.secret);
    var temp = await User.findById(decoded.id)
    if (!temp) {
      return res.status(400).send("User doesn't exist!")
    }
    var user = temp.role === 'voter' ?
      await Voter.findOne({ userId: temp.userId }) :
      await Candidate.findOne({ userId: temp.userId })
    if (!user) {
      return res.status(400).send("User doesn't exist!")
    }
    var election = await Election.findOne({ department: user.dept, batch: user.year, section: user.section })
    if (!election) {
      return res.status(400).send("Election doesn't exist yet!")
    }
    return res.status(200).send(election);
  } catch (err) {
    return res.status(500).send("Something went wrong!")
  }
});

//add new election
router.post("/", cors(), async function (req, res, next) {
  try {
    const voters = await Voter.find({
      dept: req.body.dept - 1,
      year: req.body.batch,
      section: req.body.section,
    });
    const candidates = await Candidate.find({
      dept: req.body.dept - 1,
      year: req.body.batch,
      section: req.body.section,
    });

    if (voters.length === 0 || candidates.length === 0) {
      return res.json({
        status: "failed",
        code: 404,
        message: "No voters or candidates found for this election!",
      });
    }

    const electionName =
      deptTypes[req.body.dept - 1] +
      " Year-" +
      req.body.batch +
      " Section-" +
      req.body.section +
      " election";

    // await Election.remove();

    var check = await Election.findOne({ name: electionName });
    if (check) {
      return res.status(404).send("Election Already Exists!");
    }

    const election = new Election({
      name: electionName,
      type: req.body.type,
      department: req.body.dept - 1,
      batch: req.body.batch,
      section: req.body.section,
      voters: voters,
      candidates: candidates,
    });
    const newElection = await election.save();
    return res.json({
      status: "success",
      code: 201,
      message: "Election Added",
      data: newElection,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

//Vote
router.patch("/", cors(), async function (req, res, next) {
  try {
    console.log(req.body);
    const election = await Election.findOne({
      _id: req.body.electionId,
    });

    if (!election) return res.status(400).send("Election doesn't Exist!");
    const candidate = await Candidate.findOne({
      _id: req.body.candidateId,
    });

    if (!candidate) return res.status(400).send("Candidate doesn't Exist!");
    const voter = await Voter.findOne({
      _id: req.body.voterId,
    });

    if (!voter) return res.status(400).send("Voter doesn't Exist!");


    // for (var i = 0; i < election.candidates.length; i++) {
    //     if (election.candidates[i]._id.equals(req.body.candidateId)) {
    //       election.candidates[i].voteCount += 1;
    //       election.markModified("candidates");
    //     }
    //   }

    await vote(voter, candidate, election);
    // const updatedElection = await election.save();
    return res.json({
      status: "success",
      code: 204,
      message: "Voting Successful",
      // data: updatedElection,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

router.get("/myelection", cors(), async function (req, res) {
  try {
    console.log(req.params.id);
    var token = req.headers.authorization;
    console.log(token);
    token = token.split(" ")[1];
    var decoded = jwt.decode(token, config.secret);
    const user = await User.findOne({
      userId: decoded.id,
    });
    if (!user) return res.status(500).json({ message: "1User Doesn't Exist" });
    var val;
    val = await Voter.findOne({
      _id: user.userId,
    });
    if (!val) {
      val = await Candidate.findOne({
        _id: user.userId,
      });
      if (!val) return res.status(500).json({ message: "2User Doesn't Exist" });
    }
    console.log(val);
    const election = await getPersonalizedElection(
      val.dept,
      val.year,
      val.section
    );
    // console.log(token);

    if (election) return res.status(200).json(election);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
