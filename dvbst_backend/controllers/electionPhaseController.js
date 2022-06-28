const { Router } = require("express");
const router = Router();
var cors = require("cors");
const logger = require("../helpers/logger");

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
    logger.info(`200 ${election.name} started `);

    res.send({
      status: "success",
      code: 200,
      message: "election started",
      electionStatus: electionStatus,
      election: election,
    });

  } catch (e) {
    logger.error(`500 ${election.name} start failed `);

    res.status(500).json({
      status: "err",
      code: 500,
      message: e.message,
    });

  }
});

router.post("/pause/:id", cors(), async (req, res, next) => {
  try {
    console.log("am abt to pause");
    var election = await Election.findById(req.params.id);
    console.log("election: ", election);
    await pauseElection(election.name);
    const electionStatus = await getElectionStatus(election.name);
    election = await Election.findById(req.params.id);
    logger.info(`200  ${election.name} paused `);

    res.send({
      status: "success",
      code: 200,
      message: "election paused",
      electionStatus: electionStatus,
      election: election,
    });

  } catch (e) {
    logger.error(`500 ${election.name} pause failed `);

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
    return logger.info(`200 || ${res.statusMessage} - ${election.name} ended `);

  } catch (e) {
    res.status(500).json({
      status: "err",
      code: 500,
      message: e.message,
    });
    return logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} ${election.name} end failed `);

  }
});

router.post("/extend/:id", cors(), async (req, res, next) => {
  try {
    console.log("am abt to extend");
    console.log("req.body: ", req.body.duration);
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
    return logger.info(`200 || ${res.statusMessage} - ${election.name} extended `);

  } catch (e) {
    res.status(500).json({
      status: "err",
      code: 500,
      message: e.message,
    });
    return logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} ${election.name} extend failed `);

  }
});


router.post("/restart/:id", cors(), async (req, res, next) => {
  try {
    console.log("am abt to restart");
    var election = await Election.findById(req.params.id);
    election = await restartElection(election.name, req.body.duration);
    const electionStatus = await getElectionStatus(election.name);
    // election = await Election.findById(req.params.id);

    res.send({
      status: "success",
      code: 200,
      message: "election restarted",
      electionStatus: electionStatus,
      election: election,
    });
    return logger.info(`200 || ${res.statusMessage} - ${election.name} restarted `);

  } catch (e) {
    res.status(500).json({
      status: "err",
      code: 500,
      message: e.message,
    });
    return logger.error(`500 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} ${election.name} restart failed `);

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
