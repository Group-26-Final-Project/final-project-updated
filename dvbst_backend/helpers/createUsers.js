const Candidate = require("../models/candidate");
const Voter = require("../models/voter");
const User = require("../models/user");
// const upload = require('../middleware/upload')
const bcrypt = require("bcryptjs");
// const cors = require('cors');
const Blacklist = require("../models/blacklist");
const generateAddress = require("./generateAddress");
const constants = require("../constant/constants");

async function createMockCandidates() {
  //   var candidaterange = 0;
  //   var tempcandidates = constants.CANDIDATES.slice(
  //     candidaterange,
  //     candidaterange + 3
  //   );
  for (let i = 0; i < constants.CANDIDATES.length; i++) {
    // const year = Math.floor(Math.random() * 5);
    // const section = Math.floor(Math.random() * 3);
    // const department = Math.floor(Math.random() * 6);
    const name = `Candidate${i + 1}`;
    const fname = `Candidate${i + 1}`;
    const gname = `Candidate${i + 1}`;
    const email = `Candidate${i + 1}@gmail.com`;
    const phone = `${Math.floor(Math.random() * 100000) + 555555}`;
    const id = `ATR/${Math.floor(Math.random() * 1000) + 5555}/10`;
    const dept = Math.floor(Math.random() * 2);
    const year = Math.floor(Math.random() * 2) + 1;
    const section = Math.floor(Math.random() * 2) + 1;
    try {
      var check = await User.findOne({ email: email });
      if (check) {
        console.log("1User Already Exists!");
        return;
      }
      var check = await Candidate.findOne({ id: id });
      if (check) {
        console.log("2User Already Exists!");
        return;
      }
      check = await Voter.findOne({ id: id });
      if (check) {
        console.log("3User Already Exists!");
        return;
      }
      const candidate = new Candidate({
        name: name,
        fname: fname,
        gname: gname,
        fullName: name + " " + fname + " " + gname,
        email: email,
        phone: phone,
        id: id,
        dept: dept,
        section: section,
        year: year,
        uniqueID: constants.CANDIDATES[i],
      });
      const newCandidate = await candidate.save();
      const salt = await bcrypt.genSalt(10);
      const user = new User({
        userId: newCandidate._id,
        email: newCandidate.email,
        phone: newCandidate.phone,
        role: "candidate",
      });
      user.password = await bcrypt.hash("password", salt);
      await user.save();

      //   res.json(newCandidate).status(201);

      console.log(`${name} Added`);
      // return;
    } catch (err) {
      //   res.status(400).json({ message: err.message });
      console.log(err);
      return;
    }

    // candidaterange += 3;
  }
}

async function createMockVoters() {
  for (let i = 0; i < constants.VOTERS.length; i++) {
    const name = `Voter${i + 1}`;
    const fname = `Voter${i + 1}`;
    const gname = `Voter${i + 1}`;
    const email = `Voter${i + 1}@gmail.com`;
    const phone = `${Math.floor(Math.random() * 666666) + 999999}`;
    const id = `ATR/${Math.floor(Math.random() * 6666) + 9999}/10`;
    const dept = Math.floor(Math.random() * 2);
    const year = Math.floor(Math.random() * 2) + 1;
    const section = Math.floor(Math.random() * 2) + 1;

    const voter = new Voter({
      name: name,
      fname: fname,
      gname: gname,
      fullName: name + " " + fname + " " + gname,
      email: email,
      phone: phone,
      id: id,
      dept: dept,
      section: section,
      year: year,
      uniqueID: constants.VOTERS[i],
    });
    try {
      var check = await User.findOne({ email: email });
      if (check) {
        console.log("4User Already Exists!");
        return;
      }
      var check = await Voter.findOne({ id: id });
      if (check) {
        console.log("5User Already Exists!");
        return;
      }
      check = await Candidate.findOne({ id: id });
      if (check) {
        console.log("6User Already Exists!");
        return;
      }
      const newVoter = await voter.save();
      const salt = await bcrypt.genSalt(10);
      const user = new User({
        userId: newVoter._id,
        email: newVoter.email,
        phone: newVoter.phone,

        role: "voter",
      });
      user.password = await bcrypt.hash("password", salt);
      await user.save();
      //   res.json({
      //     status: "success",
      //     code: 201,
      //     message: "Voter Added",
      //     data: newVoter,
      //   });
      console.log(`${name} Added`);
      // return;
    } catch (err) {
      // res.status(400).json({ message: err.message });
      console.log(err);
      return;
    }
  }
}

async function createMockUsers() {
  await createMockCandidates();
  await createMockVoters();
}

module.exports = createMockUsers;
