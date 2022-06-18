require("dotenv").config();
const Moralis = require("moralis/node");
const initMoralis = require("../helpers/initMoralis");

async function createResult(
  electionName,
  year,
  section,
  department,
  candidates
) {
  try {
    // await initMoralis();
    console.log("abt to create result object");
    // console.log(electionName, year, section, department, candidates);
    const ResultObject = await Moralis.Object.extend("ResultRTTrial");
    const newElectionResult = new ResultObject();
    newElectionResult.set("electionName", electionName);
    newElectionResult.set("year", year);
    newElectionResult.set("section", section);
    newElectionResult.set("department", department);
    const candidateResults = [];
    // console.log("abt to create candidate results");
    for (let index = 0; index < candidates.length; index++) {
      // const element = candidates[index];
      // console.log("generting candidate result",candidates[index]);
      candidateResults.push({ uniqueID: candidates[index].uniqueID, name: candidates[index].fullName, voteCount: 0 });
    }
    // console.log("abt to set result", candidateResults);
    newElectionResult.set("result", candidateResults);
    // console.log("i have sat result");
    await newElectionResult.save().then(
      (newResult) => {
        console.log(
          "New Election Result created with objectId: ",
          newResult.id
        );
      },
      (error) => {
        console.log(
          "Failed to create new object, with error code: " + error.message
        );
      }
    );
  } catch (err) {
    console.log("err", err);
    return err;
  }
}

module.exports = createResult;
