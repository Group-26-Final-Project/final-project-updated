const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth');
const Candidate = require('../models/candidate')
const Voter = require('../models/voter')
const User = require('../models/user')
const cors = require('cors');

// router.get("/", cors(), async (req, res, next) => {
//   try {
//     var users = await User.find();
//     res.json(users).status(200);
//   } catch (e) {
//     res.json("User doesn't exist").status(500);
//   }
// });


// get user detail
router.get("/:id", cors(), async (req, res, next) => {
  try {
    var temp = await User.findOne({userId: req.params.id});
    if (!temp) {
      return res.status(400).send("User doesn't exist")
    }
    var user = temp.role === "voter" ? await Voter.findById(req.params.id) : await Candidate.findById(req.params.id) 
    res.json(user).status(200);
  } catch (e) {
    return res.send("Can't get user").status(500);
  }
});

//candidate complete profile
// router.patch("/:id", cors(), async function (req, res, next) {
//   const candidate = await Candidate.findById(req.params.id);
//   try {
//     const updatedCandidate = await Candidate.findByIdAndUpdate(candidate._id, {
//       status: !candidate.status,
//     });
//     res.send(updatedCandidate);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

module.exports = router;