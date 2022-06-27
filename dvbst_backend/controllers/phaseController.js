const { Router } = require("express");
const router = Router();
var cors = require("cors");

// const Web3 = require("web3");
// const Provider = require("@truffle/hdwallet-provider");
// const AAiTVoteToken = require("../build/contracts/AAiTVoteToken.json");
// const AAiTElectionMukera = require("../build/contracts/AAiTElection.json");
// const Moralis = require("moralis/node");
// const mint = require("../helpers/mukera/mint");
// const transferToken = require("../helpers/mukera/transferToken");
// const transferNative = require("../helpers/mukera/transferNative");
// const transferTokenFrom = require("../helpers/mukera/transferTokenFrom");
// const getValues = require("../helpers/mukera/getValues");
// const generateAddress = require("../helpers/generateAddress");
// const updateResult = require("../helpers/updateResult");
const { changePhase,extendPhase } = require("../helpers/changePhase");
// const { generateElections } = require("../helpers/createElection");
// const constants = require("../constant/constants");
// const {vote, mockVoting} = require("../helpers/vote");
const { getPhase } = require("../helpers/changePhase");
require("dotenv").config();

// router.post("/vote", cors(), async (req, res, next) => {
//   try {
//     // const to = req.body.to;
//     // const from = req.body.from;
//     // // await transferTokenFrom(from, to);
//     // await vote(from, to);
//     const currentPhase = await getPhase();
//     console.log("current onchain Phase: ", currentPhase.phaseName);
//     await mockVoting(currentPhase.phaseName);

//     // for (let index = 3; index < constants.VOTERS.length; index++) {
//     //   try {
//     //     await vote(
//     //       constants.VOTERS[index],
//     //       constants.CANDIDATES[Math.floor(Math.random() * 20)]
//     //     );
//     //   } catch (e) {
//     //     continue;
//     //   }
//     // }

//     // if(parseFloat(balance) > 0) {}
//     // const currentGas = await Moralis.Cloud.run("getAvgGas");
//     // console.log("networkProvider", networkProvider);
//     // console.log("ethers", ethers);
//     res.send({
//       status: "success",
//       code: 200,
//       message: "everyone has voted success",
//     });
//   } catch (e) {
//     res.status(500).json({
//       status: "err",
//       code: 500,
//       message: e.message,
//     });
//   }
// });

router.get("/", cors(), async (req, res, next) => {
  try {
   console.log("am here");
    const currentPhase = await getPhase();
    console.log("current onchain Phase: ", currentPhase.phaseName);
    console.log("current onchain endDate: ", currentPhase.end);
    // await mockVoting(currentPhase.phaseName);

    // for (let index = 3; index < constants.VOTERS.length; index++) {
    //   try {
    //     await vote(
    //       constants.VOTERS[index],
    //       constants.CANDIDATES[Math.floor(Math.random() * 20)]
    //     );
    //   } catch (e) {
    //     continue;
    //   }
    // }

    // if(parseFloat(balance) > 0) {}
    // const currentGas = await Moralis.Cloud.run("getAvgGas");
    // console.log("networkProvider", networkProvider);
    // console.log("ethers", ethers);
    res.send({
      status: "success",
      code: 200,
      data: currentPhase,
    });
  } catch (e) {
    res.status(500).json({
      status: "err",
      code: 500,
      message: e.message,
    });
  }
});


router.post("/", cors(), async (req, res, next) => {
  try {
    const duration = req.body.duration;
    console.log(req.body);
    console.log("duration", duration);
    await changePhase(duration);
    const currentPhase = await getPhase();

    res.send({
      status: "success",
      code: 200,
      message: "phase changed",
      data: currentPhase,
    });
    return logger.info(`200 || ${res.statusMessage} Phase change Successful `);

  } catch (e) {
    res.status(500).json({
      status: "err",
      code: 500,
      message: e.message,
    });
    return logger.error(`200 || ${res.statusMessage} Phase change Failed `);

  }
});

router.post("/extend", cors(), async (req, res, next) => {
  try {
    const duration = req.body.duration;
    console.log(req.body);
    console.log("duration", duration);
    await extendPhase(duration);
    const currentPhase = await getPhase();

    res.send({
      status: "success",
      code: 200,
      message: "phase extended",
      data: currentPhase,
    });
    return logger.info(`200 || ${res.statusMessage} Phase extend Successful `);

  } catch (e) {
    res.status(500).json({
      status: "err",
      code: 500,
      message: e.message,
    });
    return logger.error(`200 || ${res.statusMessage} Phase extend failed `);

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
