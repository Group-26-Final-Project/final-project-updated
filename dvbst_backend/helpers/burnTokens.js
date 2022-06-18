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
const Voter = require("../models/voter");
const Candidate = require("../models/candidate");
const initContract = require("./initContract");
const constants = require("../constant/constants");
// const Web3 = require("web3");

async function burnAllTokens() {
  const contract = await initContract();
  const voters = await Voter.find({});
  var addresses = [];
  for (let i = 0; i < voters.length; i++) {
    addresses.push(voters[i].uniqueID);
  }
  const candidates = await Candidate.find({});
  for (let i = 0; i < candidates.length; i++) {
    addresses.push(candidates[i].uniqueID);
  }
  if (addresses.length === 0) return;
  const transaction = await contract.burnAllTokens(addresses);
  const transactionReceipt = await transaction.wait();
  if (transactionReceipt.status !== 1) {
    console.log("Error", transactionReceipt);
  } else {
    await markAllVotersAsNotVoted(addresses);
    console.log(`burn successful`);
  }
}

async function markAllVotersAsNotVoted(addresses) {
  for (let i = 0; i < addresses.length; i++) {
    await Voter.findOneAndUpdate({ uniqueID: addresses[i] }, { voted: false });
    console.log(`marked ${addresses[i]} as not voted`);
  }
}

module.exports = burnAllTokens;
