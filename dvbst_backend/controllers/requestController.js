const express = require("express");
const router = express.Router();
const Request = require("../models/request");

router.get("/", async (req, res, next) => {
  try {
    const requests = await Request.find()
      .populate("candidateId")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json({ data: requests, message: "Requests retrieved successfully!" });
  } catch (e) {
    console.log(e);
    res.status(500).json("Something went wrong");
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

router.patch("/approve/:id", async function (req, res) {
  try {
    const request = await Request.findById(req.params.id);
    request.isApproved = true;
    request.read = true;
    const updatedRequest = await request.save();
    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/reject/:id", async function (req, res) {
  try {
    const request = await Request.findById(req.params.id);
    request.isApproved = false;
    request.read = true;
    const updatedRequest = await request.save();
    res.status(200).json(updatedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
