require("dotenv").config();

const AAiTElectionMukeraAddress = process.env.AAITELECTION_CONTRACT_ADDRESS;
// const AAiTVoteTokenAddress = process.env.AAiTVOTETOKEN_CONTRACT_ADDRESS;

// const AAiTVoteToken = require("../build/contracts/AAiTVoteToken.json");
const AAiTElectionMukera = require("../build/contracts/AAiTElection.json");
// const Moralis = require("moralis/node");
// const initMoralis = require("./initMoralis");
const Provider = require("@truffle/hdwallet-provider");
// const deptTypes = require("../constant/deptTypes");
// const candidates = require("../constant/candidates");
// const voters = require("../constant/voters");
const initContract = require("./initContract");
const constants = require("../constant/constants");
const { removeLocalElection } = require("./createElection");

const Candidate = require("../models/candidate");
const Election = require("../models/election");
const CompletedElection = require("../models/completed");
const Archive = require("../models/archive");
// const Web3 = require("web3");

async function endOngoingElections(elections) {
  const contract = await initContract();

  for (let index = 0; index < elections.length; index++) {
    await endSingleElection(elections[index].name, contract);
  }
}

async function endSingleElection(electionName, contract) {
  const transaction = await contract.endElection(electionName);
  const transactionReceipt = await transaction.wait();
  if (transactionReceipt.status !== 1) {
    console.log("Error", transactionReceipt);
  } else {
    // removeLocalElection(electionName);
    console.log(`election removed`);
  }
}

async function saveCompletedElections(elections, phase) {
  var type = "";
  if (phase === 2) type = "section";
  else if (phase === 4) type = "year";
  else if (phase === 6) type = "department";
  for (let index = 0; index < elections.length; index++) {
    const election = await Election.findOne({ name: elections[index].name });
    if (!election) return;
    var winners = [];
    for (let index2 = 0; index2 < elections[index].winners.length; index2++) {
      const winner = await Candidate.findOne({
        uniqueID: elections[index].winners[index2],
      });
      if (!winner) continue;
      winners.push(winner);
    }
    const completedElection = new CompletedElection({
      name: election.name,
      year: election.year,
      section: election.section,
      department: election.department,
      candidates: election.candidates,
      startDate: election.startDate,
      endDate: election.endDate,
      winners: winners,
      type: type,
    });
    await completedElection.save();
    console.log(`${election.name} saved to completed`);
  }

  return;
}

async function archiveElections() {
  const completedElections = await CompletedElection.find({});
  const yr = new Date().getFullYear();

  const archive = new Archive({
    name: `AAiT Student Election Year ${yr}`,
    year: yr,
    elections: completedElections,
  });
  await archive.save();
  console.log(`${yr} Election saved to archive`);
  await Election.deleteMany({});
  await CompletedElection.deleteMany({});
}

module.exports = {
  endOngoingElections,
  saveCompletedElections,
  archiveElections,
};
