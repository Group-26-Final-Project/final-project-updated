const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Election = require("../models/election");
const Voter = require("../models/voter");
const Candidate = require("../models/candidate");
const User = require("../models/user");
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
    return res.json(elections).status(200);
  } catch (e) {
    return res.json(e).status(400);
  }
});

// get election detail
router.get("/details/:id", cors(), async (req, res, next) => {
  try {
    console.log(req.params.id);
    console.log("gugugugugagagagaga");
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

//add new election
router.post("/", async function (req, res, next) {
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
  try {
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
router.patch("/", async function (req, res, next) {
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
    id: req.body.voterId,
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

router.get("/myelection", async function (req, res) {
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
