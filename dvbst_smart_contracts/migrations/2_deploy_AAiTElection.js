const AAiTVoteToken = artifacts.require("AAiTVoteToken");
const AAiTElection = artifacts.require("AAiTElection");
// const AAiTStudent = artifacts.require("AAiTStudent");
// const AAiTUser = artifacts.require("AAiTUser");
// const AAiTElectionTimer = artifacts.require("AAiTElectionTimer");
// const AAiTElectionHandler = artifacts.require("AAiTElectionHandler");
// const biconomyForwarder = require("../list/biconomyForwarder.json");

module.exports = function (deployer, network) {
  //   const getBiconomyForwarderByNetwork = biconomyForwarder[network];
  //   if (getBiconomyForwarderByNetwork) {
  //     deployer.deploy(SimpleStorage, getBiconomyForwarderByNetwork);
  //   } else {
  //     console.log("No Biconomy Forwarder Found in the desired network!");
  //   }
  deployer.deploy(AAiTVoteToken).then(function () {
    return deployer
      .deploy(AAiTElection, AAiTVoteToken.address)
      .then(function () {
        console.log("AAITELECTION_CONTRACT_ADDRESS=" + AAiTElection.address);
        console.log("AAiTVOTETOKEN_CONTRACT_ADDRESS=" + AAiTVoteToken.address);
      })
      .catch(function (err) {
        console.log(err);
      });
  });
};
