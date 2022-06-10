// const express = require("express");
// const router = express.Router();
// const Voter = require("../models/voter");
// const Pending = require("../models/pending");
// const PreCandidate = require("../models/preCandidate");
// const Candidate = require("../models/candidate");
// const User = require("../models/user");
// const bcrypt = require("bcryptjs");
// var cors = require("cors");

// //add new candidate
// router.post("/", async function (req, res, next) {
//   const preCandidate = new PreCandidate({
//     name: req.body.name,
//     fname: req.body.fname,
//     gname: req.body.gname,
//     email: req.body.email,
//     phone: req.body.phone,
//     id: req.body.id,
//     dept: req.body.dept,
//     section: req.body.section,
//     year: req.body.year,
//     role: req.body.role
//   });
//   try {
//     var check = await User.findOne({ email: req.body.email });
//     if (check) {
//       return res.status(404).send("User Already Exists!");
//     }
//     check = await PreCandidate.findOne({ email: req.body.email, id: req.body.id });
//     if (check) {
//       return res.status(404).send("User Already Exists!");
//     }
//     check = await Pending.findOne({ email: req.body.email, id: req.body.id });
//     if (check) {
//       return res.status(404).send("User Already Exists!");
//     }
//     check = await Voter.findOne({ id: req.body.id });
//     if (check) {
//       return res.status(404).send("User Already Exists!");
//     }
//     check = await Candidate.findOne({ id: req.body.id });
//     if (check) {
//       return res.status(404).send("User Already Exists!");
//     }

//     const newCandidate = await preCandidate.save();
//     const salt = await bcrypt.genSalt(10);
//     const user = new User({
//       userId: newCandidate._id,
//       email: newCandidate.email,
//       role: "candidate",
//     });
//     user.password = await bcrypt.hash("password", salt);
//     await user.save();
//     return res.json(newCandidate).json(201);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// module.exports = router;