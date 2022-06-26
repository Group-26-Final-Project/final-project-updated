const { Router } = require("express");
const router = Router();
var cors = require("cors");

const { changePhase, extendPhase } = require("../helpers/changePhase");
const { getPhase } = require("../helpers/changePhase");
const Election = require("../models/election");
const {
  getElectionStatus,
  startElection,
  extendElection,
  pauseElection,
  restartElection,
  endElection,
} = require("../helpers/electionPhaseHandler");
require("dotenv").config();

router.get("/:id", cors(), async (req, res, next) => {
  try {
    console.log("am getting status");
    const election = await Election.findById(req.params.id);
    const electionStatus = await getElectionStatus(election.name);
    console.log("current election statuse: ", electionStatus);
    res.send({
      status: "success",
      code: 200,
      election: election,
      electionStatus: electionStatus,
    });
  } catch (e) {
    res.status(500).json({
      status: "err",
      code: 500,
      message: e.message,
    });
  }
});

router.post("/start/:id", cors(), async (req, res, next) => {
  try {
    console.log("am abt to start");
    var election = await Election.findById(req.params.id);
    await startElection(election.name);
    const electionStatus = await getElectionStatus(election.name);
    election = await Election.findById(req.params.id);

    res.send({
      status: "success",
      code: 200,
      message: "election started",
      electionStatus: electionStatus,
      election: election,
    });
  } catch (e) {
    res.status(500).json({
      status: "err",
      code: 500,
      message: e.message,
    });
  }
});

router.post("/pause/:id", cors(), async (req, res, next) => {
  try {
    console.log("am abt to stop");
    var election = await Election.findById(req.params.id);
    console.log("election: ", election);
    await pauseElection(election.name);
    const electionStatus = await getElectionStatus(election.name);
    election = await Election.findById(req.params.id);

    res.send({
      status: "success",
      code: 200,
      message: "election paused",
      electionStatus: electionStatus,
      election: election,
    });
  } catch (e) {
    res.status(500).json({
      status: "err",
      code: 500,
      message: e.message,
    });
  }
});

router.post("/end/:id", cors(), async (req, res, next) => {
  try {
    console.log("am abt to end");
    var election = await Election.findById(req.params.id);
    await endElection(election.name);
    const electionStatus = await getElectionStatus(election.name);
    election = await Election.findById(req.params.id);

    res.send({
      status: "success",
      code: 200,
      message: "election paused",
      electionStatus: electionStatus,
      election: election,
    });
  } catch (e) {
    res.status(500).json({
      status: "err",
      code: 500,
      message: e.message,
    });
  }
});

router.post("/extend/:id", cors(), async (req, res, next) => {
  try {
    console.log("am abt to extend");
    var election = await Election.findById(req.params.id);
    await extendElection(election.name, req.body.duration);
    const electionStatus = await getElectionStatus(election.name);
    election = await Election.findById(req.params.id);

    res.send({
      status: "success",
      code: 200,
      message: "election extended",
      electionStatus: electionStatus,
      election: election,
    });
  } catch (e) {
    res.status(500).json({
      status: "err",
      code: 500,
      message: e.message,
    });
  }
});


router.post("/restart/:id", cors(), async (req, res, next) => {
  try {
    console.log("am abt to extend");
    var election = await Election.findById(req.params.id);
    await restartElection(election.name, req.body.duration);
    const electionStatus = await getElectionStatus(election.name);
    election = await Election.findById(req.params.id);

    res.send({
      status: "success",
      code: 200,
      message: "election restarted",
      electionStatus: electionStatus,
      election: election,
    });
  } catch (e) {
    res.status(500).json({
      status: "err",
      code: 500,
      message: e.message,
    });
  }
});

// router.get("/generateElections", cors(), async (req, res, next) => {
//   try {
//     const elections = await generateElections();
//     res.send({
//       status: "success",
//       code: 200,
//       message: "generated elections",
//       elections: elections,
//     });
//   } catch (e) {
//     res.status(500).json({
//       status: "err",
//       code: 500,
//       message: e.message,
//     });
//   }
// });

module.exports = router;
