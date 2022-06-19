require("dotenv").config();

const AAiTElectionMukeraAddress = process.env.AAITELECTION_CONTRACT_ADDRESS;
// const AAiTVoteTokenAddress = process.env.AAiTVOTETOKEN_CONTRACT_ADDRESS;

// const AAiTVoteToken = require("../build/contracts/AAiTVoteToken.json");
const AAiTElectionMukera = require("../build/contracts/AAiTElection.json");
const Moralis = require("moralis/node");
const initContract = require("./initContract");
// const initMoralis = require("./initMoralis");
const Provider = require("@truffle/hdwallet-provider");
// const deptTypes = require("../constant/deptTypes");
// const candidates = require("../constant/candidates");
const constants = require("../constant/constants");
const createResult = require("./createResult");
const Candidate = require("../models/candidate");
const Election = require("../models/election");
const CompletedElection = require("../models/completed");
// const Web3 = require("web3");
var elections = [];

async function createElection(
  name,
  year,
  section,
  department,
  duration,
  phase,
  contract
) {
  var candidateAddresses = [];
  var candidaates;

  if (phase === 1) {
    var check = await Election.findOne({ name: name });
    if (check) return;

    candidates = await Candidate.find({
      dept: department,
      year: year,
      section: section,
    });

    if (candidates.length === 0) return;
    for (let index = 0; index < candidates.length; index++) {
      candidateAddresses.push(candidates[index].uniqueID);
    }
  } else if (phase === 3 || phase === 5) {
    console.log("phase 3 or 5");
    console.log("abt to merge candidates");
    candidates = await mergeCandidates(year, section, department);
    if (candidates.length === 0) return;
    for (let index = 0; index < candidates.length; index++) {
      candidateAddresses.push(candidates[index].uniqueID);
    }
  } else {
    console.log("Invalid Phase");
    return "Invalid Phase";
  }

  const startDate = Math.floor(Date.now() / 1000);
  const endDate = startDate + duration;
  const transaction = await contract.createElection(
    name,
    startDate,
    endDate,
    candidateAddresses,
    year,
    section,
    department
  );
  const transactionReceipt = await transaction.wait();
  if (transactionReceipt.status !== 1) {
    console.log("Error", transactionReceipt);
    return;
  } else {
    console.log("created onchain election");
    await createElectionLocal(
      name,
      startDate,
      endDate,
      candidates,
      year,
      section,
      department
    );
    console.log("created local election");
    await createResult(name, year, section, department, candidates);

    console.log(`${name} election created`);
  }
  // const zoption = {
  //   contractAddress: AAiTElectionMukeraAddress,
  //   abi: AAiTElectionMukera.abi,
  // };

  // await Moralis.executeFunction({
  //   ...zoption,
  //   functionName: "createElection",
  //   params: {
  //     name: name,
  //     startDate: start,
  //     endDate: end,
  //     candidates: candidates,
  //     year: year,
  //     section: section,
  //     department: department,
  //   },
  // }).then(async (result) => {
  //   console.log("waiting for election creation to be mined");
  //   await result.wait().then((finalTx) => {
  //     console.log("transaction mined");
  //     //   console.log(finalTx);
  //   });
  //   // console.log(result);
  // });
}

async function generateElections(phaseName) {
  const contract = await initContract();
  await removeOnchainCompletedElections(contract);
  // const currentPhase = await getPhase();

  if (phaseName === 1) {
    for (let i = 0; i < 3; i++) {
      for (let j = 1; j < 3; j++) {
        for (let k = 1; k < 3; k++) {
          const name = `${constants.DEPT_TYPES[i]} Year ${j} - Section ${k}`;
          await createElection(name, j, k, i, 500, phaseName, contract);
        }
      }
    }
  } else if (phaseName === 3) {
    await Election.deleteMany({});
    for (let i = 0; i < 3; i++) {
      for (let j = 1; j < 3; j++) {
        const name = `${constants.DEPT_TYPES[i]} Year ${j}`;
        await createElection(name, j, 0, i, 500, phaseName, contract);
      }
    }
  } else if (phaseName === 5) {
    await Election.deleteMany({});
    console.log("generating elections");
    for (let i = 0; i < 3; i++) {
      const name = `${constants.DEPT_TYPES[i]}`;
      await createElection(name, 0, 0, i, 500, phaseName, contract);
    }
  }
  const result = await contract.getAllCurrentElections();
  return result;
}

async function createElectionLocal(
  name,
  startDate,
  endDate,
  tempcandidates,
  year,
  section,
  department
) {
  const election = new Election({
    name: name,
    startDate: startDate,
    endDate: endDate,
    candidates: tempcandidates,
    year: year,
    section: section,
    department: department,
  });
  await election.save();
  return;
}

function getLocalElectionByCandidate(candidateAddress) {
  // console.log("elections", elections);
  for (let index = 0; index < elections.length; index++) {
    if (elections[index].candidates.includes(candidateAddress)) {
      return elections[index];
    }
  }
}
function removeLocalElection(electionName) {
  // console.log("elections", elections);
  const index = elections.indexOf(electionName);
  if (index > -1) {
    array.splice(index, 1);
  }
}

async function mergeCandidates(year, section, department) {
  console.log("year and section", year, section);
  const newCandidates = [];
  if (year === 0 && section == 0) {
    const elections = await CompletedElection.find({ type: "year" });

    for (let index = 0; index < elections.length; index++) {
      if (elections[index].department === department) {
        for (
          let index2 = 0;
          index2 < elections[index].winners.length;
          index2++
        ) {
          newCandidates.push(elections[index].winners[index2]);
        }
      }
    }
    console.log("new candidates", newCandidates);
    return newCandidates;
  }
  if (section === 0) {
    const elections = await CompletedElection.find({ type: "section" });

    for (let index = 0; index < elections.length; index++) {
      if (
        elections[index].department === department &&
        elections[index].year === year
      ) {
        for (
          let index2 = 0;
          index2 < elections[index].winners.length;
          index2++
        ) {
          newCandidates.push(elections[index].winners[index2]);
        }
      }
    }
    return newCandidates;
  }
}

async function removeOnchainCompletedElections(contract) {
  const transaction = await contract.removeAllCompletedElections();
  const transactionReceipt = await transaction.wait();
  if (transactionReceipt.status !== 1) {
    console.log("Error", transactionReceipt);
    return;
  } else {
    console.log("Removed all completed elections");
    return;
  }
}
module.exports = {
  createElection,
  generateElections,
  getLocalElectionByCandidate,
  removeLocalElection,
};
