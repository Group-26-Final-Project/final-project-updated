require("dotenv").config();
const AAiTElectionMukeraAddress = process.env.AAITELECTION_CONTRACT_ADDRESS;
const AAiTElectionMukera = require("../build/contracts/AAiTElection.json");

const initMoralis = require("../helpers/initMoralis");
const AAiTVoteToken = require("../build/contracts/AAiTVoteToken.json");
const AAiTVoteTokenAddress = process.env.AAiTVOTETOKEN_CONTRACT_ADDRESS;
const Moralis = require("moralis/node");
const { generateElections, createElection } = require("./createElection");
const initContract = require("./initContract");
const initToken = require("./initToken");
const mintAndSendTokens = require("./mintAndSendTokens");
const burnAllTokens = require("./burnTokens");
const {
  endOngoingElections,
  saveCompletedElections,
  archiveElections,
} = require("./endOngoingElections");
const createMockUsers = require("./createUsers");
const Election = require("../models/election");
const Voter = require("../models/voter");
const Candidate = require("../models/candidate");

// const Phase = require("../models/phase");

// const PHASE_NAME = [
//   "REGISTRATION",
//   "REGISTRATION_BREAK",
//   "SECTION_ELECTION",
//   "SECTION_ELECTION_BREAK",
//   "BATCH_ELECTION",
//   "BATCH_ELECTION_BREAK",
//   "DEPARTMENT_ELECTION",
//   "COMPLETED",
// ];

// var phase = {
//   phaseName: 7,
//   start: 0,
//   end: 0,
// };

// async function changePhase(duration) {
//   try {
//     var contract;
//     var elections;
//     var completed;
//     // clog
//     // await initMoralis();
//     // console.log("current local phase: ", await getLocalPhase().phaseName);
//     const currentPhase = await getPhase();
//     console.log("current onchain Phase: ", currentPhase.phaseName);
//     console.log("new duration: ", duration);
//     switch (currentPhase.phaseName) {
//       case 7:
//         // set Token Address
//         // start registration and idea suggestion
//         // const newphase = new Phase({
//         //   phaseName: 7,
//         //   start: 0,
//         //   end: 0,
//         // });
//         // await newphase.save();
//         const token = await initToken();
//         await token.setAddresses(AAiTElectionMukeraAddress).then(async (tx) => {
//           console.log("waiting to set election address");
//           await tx.wait().then(async (txReceipt) => {
//             console.log(`election address set successful`);
//           });
//         });
//         await createMockUsers();
//         await setLocalPhase(duration);
//         console.log("phase changed from 7 - 0");
//         console.log("try adding candidates and voters");
//         console.log("try suggesting ideas now");
//         break;

//       case 0:
//         // candidadte finalize editing
//         await setLocalPhase(duration);
//         console.log("phase changed from 0 - 1");
//         console.log("tell candidates to finalize editing");

//         break;
//       case 1:

//         // create sction elections
//         // mint and send tokens
//         // allow voting and disqualifying

//         await generateElections(currentPhase.phaseName,duration);
//         await mintAndSendTokens();
//         await setLocalPhase(duration);
//         console.log("phase changed from 1 - 2");
//         console.log("try voting now!!!");
//         break;
//       case 2:
//         // end all ongoing elections
//         // burn tokens
//         // switch loosing candidate to voter

//         contract = await initContract();
//         elections = await contract.getAllCurrentElections();
//         await endOngoingElections(elections);
//         completed = await contract.getAllCompletedElections();
//         await saveCompletedElections(completed, currentPhase.phaseName);
//         await burnAllTokens();

//         await setLocalPhase(duration);
//         console.log("phase changed from 2 - 3");
//         console.log("all elections completed and saved");

//         break;
//       case 3:

//         // create year elections
//         // mint and send tokens
//         // allow voting and disqualifying

//         await generateElections(currentPhase.phaseName,duration);
//         await mintAndSendTokens();
//         await setLocalPhase(duration);
//         console.log("phase changed from 3 - 4");
//         console.log("try voting now!!!");

//         break;
//       case 4:

//         // end all ongoing elections
//         // burn tokens
//         // switch loosing candidate to voter

//         contract = await initContract();
//         elections = await contract.getAllCurrentElections();
//         await endOngoingElections(elections);
//         completed = await contract.getAllCompletedElections();
//         await saveCompletedElections(completed, currentPhase.phaseName);
//         await burnAllTokens();

//         await setLocalPhase(duration);
//         console.log("phase changed from 4 - 5");
//         console.log("all elections completed and saved");

//         break;
//       case 5:

//         // create year elections
//         // mint and send tokens
//         // allow voting and disqualifying

//         await generateElections(currentPhase.phaseName,duration);
//         await mintAndSendTokens();
//         await setLocalPhase(duration);

//         console.log("phase changed from 5 - 6");
//         console.log("try voting now!!!");

//         break;
//       case 6:
//         // end all ongoing elections
//         // burn tokens
//         contract = await initContract();
//         elections = await contract.getAllCurrentElections();
//         await endOngoingElections(elections);
//         completed = await contract.getAllCompletedElections();
//         await saveCompletedElections(completed, currentPhase.phaseName);
//         await burnAllTokens();
//         await archiveElections();
//         await setLocalPhase(duration);

//         console.log("phase changed from 6 - 7");
//         break;
//       default:
//         break;
//       // return phase;
//     }
//   } catch (e) {
//     console.log(e.message);
//     return e.message;
//   }
// }

async function getElectionStatus(electionName) {
  try {
    // await initMoralis();
    // await Moralis.enableWeb3({
    //   chainId: "0x3",
    //   privateKey:
    //     "bc5896a7c2af1da02e52b66a44d3d15c613dc18fc7a55567992e3ae02c0cb289",
    // });
    // console.log("abt to get phase");
    // const currentPhase = await Moralis.executeFunction({
    //   contractAddress: AAiTElectionMukeraAddress,
    //   abi: AAiTElectionMukera.abi,
    //   functionName: "getCurrentPhase",
    // });

    const contract = await initContract();
    const status = await contract.getElectionStatus(electionName);
    const endDate = await contract.getElectionEndDate(electionName);

    // console.log("currentPhase", currentPhase);
    return {
      status: Number(status.hex),
      endDate: Number(endDate.hex),
    };
  } catch (e) {
    console.log("error", e);
    throw Error("error getting phase");
    // return e;
  }
}

async function extendElection(electionName, duration) {
  const contract = await initContract();

  await contract.extendElection(electionName, duration).then(async (tx) => {
    console.log("waiting to mine election extension");
    await tx.wait().then(async (txReceipt) => {
      await Election.findOneAndUpdate(
        { name: electionName },
        { endDate: duration }
      );
      // also extend overall phase by duration plus 1 day
      console.log(`election extension successful`);
    });
  });
}

async function startElection(electionName) {
  const contract = await initContract();

  await contract.startElection(electionName).then(async (tx) => {
    console.log("waiting to mine election start");
    await tx.wait().then(async (txReceipt) => {
      await Election.findOneAndUpdate({ name: electionName }, { status: 1 });
      console.log(`election start successful`);

      // const phase = await getLocalPhase();
      // console.log(phase.phaseName);
    });
  });
}

async function pauseElection(electionName) {
  const contract = await initContract();

  await contract.pauseElection(electionName).then(async (tx) => {
    console.log("waiting to mine election pause");
    await tx.wait().then(async (txReceipt) => {
      await Election.findOneAndUpdate({ name: electionName }, { status: 0 });
      console.log(`election pause successful`);
      // const phase = await getLocalPhase();
      // console.log(phase.phaseName);
    });
  });
}

async function endElection(electionName) {
  const contract = await initContract();

  await contract.endElection(electionName).then(async (tx) => {
    console.log("waiting to mine election end");
    await tx.wait().then(async (txReceipt) => {
      await Election.findOneAndUpdate({ name: electionName }, { status: 2 });
      console.log(`election end successful`);
      // const phase = await getLocalPhase();
      // console.log(phase.phaseName);
    });
  });
}

async function restartElection(electionName, duration) {
  const contract = await initContract();

  const tx = await contract.removeElection(electionName);
  // .then(async (tx) => {
  console.log("waiting to mine election restart");
  await tx.wait();
  // .then(async (txReceipt) => {
  const election = await Election.findOne({ name: electionName });
  const voterAddresses = await getVoterAddresses(election);
  // remove votes remaining for specific voters

  const remainingVotesRemoveTx = await contract.removeVotesRemainingForVoters(
    voterAddresses
  );
  await remainingVotesRemoveTx.wait().then(async (txReceipt) => {
    console.log(`remaining votes removed`);
  });
  // console.log("removed votes remaining");
  // burn token for specific voters and candidates
  const candidateAddresses = await getCandidateAddresses(election);
  var burnableAddresses = voterAddresses.concat(candidateAddresses);
  const burnAllTokensTx = await contract.burnAllTokens(burnableAddresses);
  await burnAllTokensTx.wait();
  console.log("burn all coresponding tokens");

  // get election from mongo and delete it

  await Election.deleteOne({ name: electionName });
  console.log("removed local election");

  await removeRealTimeResult(electionName);
  await createElection(
    election.name,
    election.year,
    election.section,
    election.department,
    duration,
    election.phase,
    contract,
    candidateAddresses
  );

  // create new election with same data

  const transaction = await contract.mintAndSendTokens(voterAddresses);
  const transactionReceipt = await transaction.wait();
  if (transactionReceipt.status !== 1) {
    console.log("Error", transactionReceipt);
  } else {
    console.log(`mint and successful`);
  }
  // remint tokens for specific voters

  console.log(`election restart successful`);
  const result = await Election.findOne({ name: electionName });
  return result;
  // });
  // });
}

async function getCandidateAddresses(election) {
  var candidateAddresses = [];
  for (var i = 0; i < election.candidates.length; i++) {
    candidateAddresses.push(election.candidates[i].uniqueID);
  }
  return candidateAddresses;
}

async function getVoterAddresses(election) {
  var voters = [];
  var voterAddresses = [];
  if (election.section === 0 && election.year === 0) {
    console.log("abt to get dept election voters");
    voters = await Voter.find({
      dept: election.department,
    });
  } else if (election.section === 0) {
    console.log("abt to get year election voters");
    voters = await Voter.find({
      dept: election.department,
      year: election.year,
    });
  } else if (election.section !== 0 && election.year !== 0) {
    console.log("abt to get section election voters");
    voters = await Voter.find({
      dept: election.department,
      year: election.year,
      section: election.section,
    });
  }

  if (voters.length > 0) {
    for (var i = 0; i < voters.length; i++) {
      voterAddresses.push(voters[i].uniqueID);
    }
  }
  return voterAddresses;
}

async function removeRealTimeResult(electionName) {
  try {
    const syncTable = Moralis.Object.extend("ResultRTTrial");
    const query = new Moralis.Query(syncTable);
    query.equalTo("electionName", electionName);
    var result = await query.find();
    var electionResult = result[0];
    await electionResult.destroy().then(() => {
      console.log("removed real time result");
    });
  } catch (e) {
    console.log(e);
  }
}
// async function setLocalPhase(duration) {
//   // await Moralis.executeFunction({
//   //   contractAddress: AAiTElectionMukeraAddress,
//   //   abi: AAiTElectionMukera.abi,
//   //   functionName: "changePhase",
//   //   params: {
//   //     duration: 200,
//   //   },
//   // });
//   console.log("duration: ", duration);
//   console.log("abt to change phase");
//   var start = new Date(Date.now());
//   // date.setDate(date.getDate());
//   const timestamp = Math.floor(start.getTime());
//   console.log(timestamp);
//   const contract = await initContract();
//   console.log("got contract");
//   await contract.changePhase(timestamp, duration).then(async (tx) => {
//     console.log("waiting to mine phase change");
//     await tx.wait().then(async (txReceipt) => {
//       console.log(`phase change successful`);
//       // const phase = await getLocalPhase();
//       // console.log(phase.phaseName);
//       // console.log(txReceipt);
//       // if (phase.phaseName === 7) {
//       //   const newphase = {
//       //     phaseName: 0,
//       //     start: Math.floor(Date.now() / 1000),
//       //     end: Math.floor(Date.now() / 1000) + duration,
//       //   };
//       //   await Phase.findOneAndUpdate({ phaseName: phase.phaseName }, newphase);
//       // } else {
//       //   const nextPhaseName = (phase.phaseName += 1);
//       //   console.log(nextPhaseName);
//       //   const newphase = {
//       //     phaseName: nextPhaseName,
//       //     start: Math.floor(Date.now() / 1000),
//       //     end: Math.floor(Date.now() / 1000) + duration,
//       //   };
//       //   await Phase.findOneAndUpdate({ phaseName: phase.phaseName }, newphase);
//       // }
//     });
//   });

// console.log("new local phase: ", await getLocalPhase());
// console.log("new onchain phase: ", await contract.getCurrentPhase());

module.exports = {
  getElectionStatus,
  extendElection,
  startElection,
  pauseElection,
  endElection,
  restartElection,
};
