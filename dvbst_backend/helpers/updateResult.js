require("dotenv").config();
const Moralis = require("moralis/node");
const initMoralis = require("../helpers/initMoralis");

async function updateResult(electionName, candidateAddress) {
  try {
    var count;
    // await initMoralis();
    console.log("abt to updateResult");
    const syncTable = Moralis.Object.extend("ResultRTTrial");
    const query = new Moralis.Query(syncTable);
    query.equalTo("electionName", electionName);
    var result = await query.find();
    // console.log("result", result[0]);
    // console.log("candidate", result[0].get("candidate"));
    // console.log("count", result[0].get("voteCount"));
    var electionResult = result[0].get("result");
    // console.log("electionResult", electionResult);
    for (let index = 0; index < electionResult.length; index++) {
      if (electionResult[index].uniqueID === candidateAddress) {
        count = Number(electionResult[index].voteCount);
        electionResult[index].voteCount = (count += 1);
        console.log("count", count);
        break;
      }
    }
    // console.log("newelectionResult", electionResult);
    // const new
    result[0].set("result", electionResult);

    // console.log(result[0].get("voteCount"));

    await result[0].save();
    console.log("result updated");
    return count;
    //get monster with id xWMyZ4YEGZ
    // console.log("result: ", result);
  } catch (err) {
    console.log("err", err);
    return false;
  }
}

module.exports = updateResult;
