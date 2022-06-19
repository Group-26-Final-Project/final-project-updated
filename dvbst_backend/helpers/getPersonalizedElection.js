const Voter = require("../models/voter");
const Election = require("../models/election");
const Candidate = require("../models/candidate");
const { getPhase } = require("./changePhase");

async function getPersonalizedElection(dept, year, section) {
  try {
    const phase = await getPhase();
    console.log(phase);
    if (phase === 2) {
      return await Election.findOne({
        department: dept,
        section: section,
        year: year,
      });
    } else if (phase === 4) {
      return await Election.findOne({
        department: dept,
        year: year,
      });
    } else if (phase === 6) {
      return await Election.findOne({
        department: dept,
      });
    }
  } catch (e) {
    return e;
  }
}

module.exports = getPersonalizedElection;
