const express = require("express");
const router = express.Router();
const Request = require("../models/request");
const Candidate = require("../models/candidate");
const AllUser = require("../models/allUser");
const Voter = require("../models/voter");
const Election = require("../models/election");
const Blacklist = require("../models/blacklist");
const Pending = require("../models/pending");
const completed = require("../models/completed");

router.get("/", async (req, res, next) => {
  try {
    const totalUsers = await AllUser.find({}).count();
    const totalCandidates = await Candidate.find({}).count();
    const totalVoters = await Voter.find({}).count();
    const totalOngoingElections = await Election.find({}).count();
    const totalPendingRequests = await Pending.find({}).count();
    const totalFinishedElections = await completed.find({}).count();
    const totalBlacklistedCandidates = await Blacklist.find({}).count();

    res.status(200).json({
      data: {
        totalUsers,
        totalCandidates,
        totalVoters,
        totalOngoingElections,
        totalPendingRequests,
        totalFinishedElections,
        totalBlacklistedCandidates,
      },
      message: "Requests retrieved successfully!",
    });
  } catch (e) {
    res.json("Something went wrong").status(500);
  }
});

router.post("/", async function (req, res) {
  try {
    const request = new Request({
      candidateId: req.body.candidateId,
      type: req.body.type,
      description: req.body.description,
    });
    const newRequest = await request.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/approve", async function (req, res) {
  try {
    const request = await Request.findById(req.params.id);
    request.isApproved = true;
    const updatedRequest = await request.save();
    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/decline", async function (req, res) {
  try {
    const request = await Request.findById(req.params.id);
    request.isApproved = false;
    const updatedRequest = await request.save();
    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
