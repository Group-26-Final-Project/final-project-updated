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

async function blacklistCandidate(candidateAddress) {
  const contract = await initContract();
    const transaction = await contract.blacklistCandidate(candidateAddress);
  
  const transactionReceipt = await transaction.wait();
  if (transactionReceipt.status !== 1) {
    console.log("Error", transactionReceipt);
  } else {
    await markAllVotersAsNotVoted(addresses);
    console.log(`blacklisted successfull`);
  }
}

module.exports = blacklistCandidate;
