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
const initToken = require("./initToken");
const constants = require("../constant/constants");
const Voter = require("../models/voter");
// const Web3 = require("web3");

async function getBalance(address) {
    try{
        const contract = await initToken();
  
        const balance = await contract.balanceOf(address);

        return balance;
    }
    catch(e){
        console.log(e);
        throw Error("Error getting balance");
    }
  
//   const transactionReceipt = await transaction.wait();
//   if (transactionReceipt.status !== 1) {
//     console.log("Error", transactionReceipt);
//   } else {
//     console.log(`mint and successful`);
//   }
}

module.exports = getBalance;
