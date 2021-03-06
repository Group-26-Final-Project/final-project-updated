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
const logger = require("../helpers/logger");

const deptTypes = [
  "Center of Biomedical Engineering (CBME)",
  "School of Chemical and Bio Engineering (SCBE)",
  "School of Civil & Environmental Engineering (SCEE)",
  "School of Electrical & Computer Engineering (SECE)",
  "School of Mechanical and Industrial Engineering (SMiE)",
  "School of Information Technology Engineering (SITE)"
  // "Software Engineering",
  // "Biomedical Engineering",
  // "Chemical Engineering",
  // "Civil Engineering",
  // "Electrical Engineering",
  // "Mechanical Engineering",
];
//get all elections
router.get("/", cors(), async (req, res, next) => {
  try {
    var elections = [];
    console.log("abt to get all elections");
    elections = await Election.find();
    if (elections.length === 0) elections = await CompletedElections.find();
    if (elections.length === 0) {
      const temp = await ArchivedElections.find({ year: 2022 });
      elections = temp.elections;
    }
    if (!elections) elections = [];
    return res.json(elections).status(200);
  } catch (e) {
    return res.json(e).status(400);
  }
});

// get election detail
router.get("/details/:id", cors(), async (req, res, next) => {
  try {
    var election = await Election.findById(req.params.id);

    var voters = [];
    if (election.section === 0 && election.year === 0) {
      console.log("abt to get dept election voters");
      voters = await Voter.find({
        dept: election.department,

      });
    } else if (election.section === 0) {
      console.log("abt to get year election voters");
      voters = await Voter.find({
        dept: election.department,
        year: election.year
      });
    } else if (election.section !== 0 && election.year !== 0) {
      console.log("abt to get section election voters");
      voters = await Voter.find({
        dept: election.department,
        year: election.year,
        section: election.section
      });
    }

    // election.voters = voters;
    console.log(voters.length);

    return res.json({
      status: "success",
      code: 200,
      data: election,
      voters: voters,
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

      res.json({
        status: "failed",
        code: 404,
        message: "No voters or candidates found for this election!",
      });
      return logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} No Candidates/Voters found`);

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
      res.status(404).send("Election Already Exists!");
      return logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} Eleciton Exists`);

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
    res.json({
      status: "success",
      code: 201,
      message: "Election Added",
      data: newElection,
    });
    return logger.info(`201 || ${res.statusMessage} - ${electionName} Election Created `);

  } catch (err) {
    res.status(400).json({ message: err.message });
    return logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} Error creating Election ${electionName}`);

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
    res.json({
      status: "success",
      code: 204,
      message: "Voting Successful",
      // data: updatedElection,
    });
    return logger.info(`204 || ${res.statusMessage} Vote Successful `);

  } catch (err) {
    res.status(500).json({ message: err.message });
    return logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} Vote Unsuccessful`);

  }
});

router.get("/myelection", cors(), async function (req, res) {
  try {
    // console.log(req.params.id);
    var token = req.headers.authorization;
    console.log(token);
    token = token.split(" ")[1];
    var decoded = jwt.decode(token, config.secret);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(500).json({ message: "1User Doesn't Exist" });
    var val;
    val = await Voter.findById(user.userId);
    if (!val) {
      val = await Candidate.findById(user.userId);
    }
    if (!val) return res.status(500).json({ message: "2User Doesn't Exist" });
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
