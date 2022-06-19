require("dotenv").config();
const Provider = require("@truffle/hdwallet-provider");
const Moralis = require("moralis/node");
const AAiTVoteToken = require("../build/contracts/AAiTVoteToken.json");
const AAiTVoteTokenAddress = process.env.AAiTVOTETOKEN_CONTRACT_ADDRESS;


async function initToken(){
    const ethPrivkey = process.env.GANACHE_PRIVATE_KEY;

  const rpcUrl = `http://localhost:8545`;
  const provider = new Provider(ethPrivkey, rpcUrl);

  //   const ethPrivkey = process.env.GANACHE_PRIVATE_KEY;

  const ethers = Moralis.web3Library;

  const web3provider = new ethers.providers.Web3Provider(provider);
  const signer = web3provider.getSigner();

  const contract = new ethers.Contract(
    AAiTVoteTokenAddress,
    AAiTVoteToken.abi,
    signer
  );

  return contract;
}

module.exports = initToken;

