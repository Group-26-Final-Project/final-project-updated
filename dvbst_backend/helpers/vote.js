require("dotenv").config();

const AAiTElectionMukeraAddress = process.env.AAITELECTION_CONTRACT_ADDRESS;
// const AAiTVoteTokenAddress = process.env.AAiTVOTETOKEN_CONTRACT_ADDRESS;

// const AAiTVoteToken = require("../build/contracts/AAiTVoteToken.json");
const AAiTElectionMukera = require("../build/contracts/AAiTElection.json");
// const Moralis = require("moralis/node");
// const constants = require("../constant");
const initContract = require("./initContract");

const initMoralis = require("./initMoralis");
const Provider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const updateResult = require("./updateResult");
const { getLocalElectionByCandidate } = require("./createElection");
const Voter = require("../models/voter");
const Election = require("../models/election");
const Candidate = require("../models/candidate");
const { getPhase } = require("./changePhase");
// const Voter = require("../models/voter");

async function vote(voter, candidate, election) {
  try {
    // console.log("in vote",to);
    const phase = await getPhase();
    console.log("phase",phase.phaseName);
    if(!(phase.phaseName === 2 || phase.phaseName === 4 || phase.phaseName === 6)) throw Error("Invalid Phase");


    // var check = await Voter.findOne({ uniqueID: from });
    // if (!check) {
    //   console.log("Uknown voter");
    //   return "Unknown voter";
    // }
    if (voter.voted) {
      console.log("Voter already voted");
      return "Voter already voted";
    }
    // const election = await Election.findOne({
    //   year: check.year,
    //   section: check.section,
    //   department: check.dept,
    // });
    // 
    // // // // // // // // // // // // // // // dont forget to bring phase check from mockvoting to here
    // if (phase === 2) {
    //   election = await Election.findOne({
    //     department: check.dept,
    //     section: check.section,
    //     year: check.year,
    //   });
    // } else if (phase === 4) {
    //   election = await Election.findOne({
    //     department: check.dept,
    //     year: check.year,
    //   });
    // } else if (phase === 6) {
    //   election = await Election.findOne({
    //     department: check.dept,
    //   });
    // } else {
    //   console.log("Invalid phase");
    //   return "Invalid phase";
    // }

    // if (!election) {
    //     console.log("Unknown election");
    //     return "Unknown election";
    //   }

    // console.log("am here");
    for (let index = 0; index < election.candidates.length; index++) {
      // console.log("am in for loop");
      if (election.candidates[index].uniqueID === candidate.uniqueID) {
        console.log(voter, candidate.uniqueID);
        // console.log("am in if");
        const contract = await initContract();

        const transaction = await contract.vote(voter.uniqueID, candidate.uniqueID);
        const transactionReceipt = await transaction.wait();
        if (transactionReceipt.status !== 1) {
          console.log("Error", transactionReceipt);
        } else {
          // const election = getLocalElectionByCandidate(to);
          // console.log("got election:", election);
          const count = await updateResult(election.name, candidate.uniqueID);
          if (Number.isInteger(count)) {
            await Candidate.findOneAndUpdate(
              { uniqueID: candidate.uniqueID },
              { voteCount: count }
            );
            await Election.findOneAndUpdate(
              { name: election.name, 'candidates.uniqueID':candidate.uniqueID },
              { $set:
                { 'candidates.$.voteCount': count }
              }
            );
            await Voter.findOneAndUpdate({ uniqueID: voter.uniqueID }, { voted: true });

            console.log(`${voter.uniqueID} voted for ${candidate.uniqueID}`);
            return "Success";
          }
        }
      }
    }
    console.log("Unknown candidate");
    return "Unknown candidate";
  } catch (error) {
    console.log("Error", error);
    throw Error(error.message);
  }
  //   await initMoralis();
  // const web3provider = await Moralis.enableWeb3({
  //   provider: "magicLink",
  //   email: "rahelayeled@gmail.com",
  //   apiKey: "pk_live_E6ECED79D2FC1893",
  //   network: "ropsten",
  // });
  //   const ethPrivkey =
  //     process.env.ROPSTEN_PRIVATE_KEY;
  // const rpcUrl = `https://speedy-nodes-nyc.moralis.io/${process.env.MORALIS_SPEEDY_NODES_KEY}/eth/ropsten`;

  // console.log(rpcUrl);
  // // const ethers = Moralis.web3Library;
  // const provider = new Provider(ethPrivkey, rpcUrl);
  // const web3 = new Web3(provider);

  //     const web3provider = await Moralis.enableWeb3({
  //     chainId: "0x3",
  //     privateKey: ethPrivkey,
  //   });

  // const wallet = new ethers.Wallet(ethPrivkey, provider);
  // const signer = wallet.provider.getSigner(wallet.address);

  // console.log(signer);

  //   const zoption = {
  //     contractAddress: AAiTElectionMukeraAddress,
  //     abi: AAiTElectionMukera.abi,
  //   };
  // console.log("abt to execute");

  // const contract = new web3.eth.Contract(
  //   AAiTElectionMukera.abi,
  //   AAiTElectionMukeraAddress
  // );
  // const gasPrice = await provider.getGasPrice();
  // console.log("gas price", parseInt(Number(gasPrice._hex)).toString());

  // console.log("got all i ned to transact");
  // const receipt = await contract.methods.vote(from, to).send({ from: "0xa476BD1E9c1e7fc51eD7Dc9BAaCA5f8cb2D0F4ca" });
  // console.log(receipt);
  // const transaction = await contract.vote(from, to, {
  //   gasLimit: 100000000,
  //   gasPrice: gasPrice,
  // });
  // console.log("waiting for token transfer to be mined");
  // await transaction.wait();
  //     await Moralis.executeFunction({
  //       ...zoption,
  //       functionName: "vote",
  //       params: {
  //         voterAddress: from,
  //         candidateAddress: to,
  //       },
  //     }).then(async (result) => {
  //       console.log("waiting for token transfer to be mined");
  //       await result.wait().then((finalTx) => {
  //         console.log("transaction mined");
  //       //   console.log(finalTx);
  //       });
  //       // console.log(result);
  //   });
}

async function mockVoting(phase) {
  const voters = await Voter.find({});
  for (let index = 0; index < voters.length; index++) {
    var election;
    if (phase === 2) {
      election = await Election.findOne({
        department: voters[index].dept,
        section: voters[index].section,
        year: voters[index].year,
      });
    } else if (phase === 4) {
      election = await Election.findOne({
        department: voters[index].dept,
        year: voters[index].year,
      });
    } else if (phase === 6) {
      election = await Election.findOne({
        department: voters[index].dept,
      });
    } else {
      console.log("Invalid phase");
      return "Invalid phase";
    }

    if (!election) continue;
    try {
      // console.log("in timeout");
      // console.log(election.candidates);
     await vote(
        voters[index].uniqueID,
        election.candidates[
          Math.floor(Math.random() * (election.candidates.length - 1))
        ].uniqueID,
        phase
      );
      // await new Promise(resolve => setTimeout(resolve, 4000));

    } catch (e) {
      continue;
    }
  }
}

// async function voteSetTimeout(voter, candidate) {
//   await vote(voter, candidate);

//   setTimeout(async () => {
//   console.log("in timeout");

//   }, 3000);
// }
// function timeout(ms) {
// }

module.exports = { vote, mockVoting };
