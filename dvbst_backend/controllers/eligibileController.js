const express = require("express");
const router = express.Router();
const Voter = require("../models/voter");
const Candidate = require("../models/candidate");
const Pending = require("../models/pending");
const AllUser = require("../models/allUser");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

var cors = require("cors");
const generateAddress = require('../helpers/generateAddress')

//check if voter/candidate is eligibile
router.post("/", cors(), async function (req, res, next) {
    try {
        const uniqueID = await generateAddress();

        const voter = new Voter({
            name: req.body.name,
            fname: req.body.fname,
            gname: req.body.gname,
            fullName: req.body.name + " " + req.body.fname + " " + req.body.gname,
            email: req.body.email,
            phone: req.body.phone,
            id: req.body.id,
            dept: req.body.dept,
            section: req.body.section,
            year: req.body.year,
        });
        var check = await User.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).send("User Already Exists!");
        }
        check = await Voter.findOne({ id: req.body.id });
        if (check) {
            return res.status(400).send("User Already Exists!");
        }
        check = await Candidate.findOne({ id: req.body.id });
        if (check) {
            return res.status(400).send("User Already Exists!");
        }
        check = await AllUser.findOne({
            name: req.body.name,
            fname: req.body.fname,
            gname: req.body.gname,
            email: req.body.email,
            phone: req.body.phone,
            id: req.body.id,
            dept: req.body.dept,
            section: req.body.section,
            year: req.body.year
        })
        if (!check) {
            return res.status(400).send("You are not an eligible user!");
        }
        voter.uniqueID = uniqueID;
        const newVoter = await voter.save();
        const salt = await bcrypt.genSalt(10);
        const user = new User({
            userId: newVoter._id,
            phone: newVoter.phone,
            email: newVoter.email,
            role: "voter",
        });
        user.password = await bcrypt.hash(req.body.password, salt);
        await user.save();
        if (req.body.role === "candidate") {
            const pending = new Pending({
                userId: newVoter._id,
                name: newVoter.name,
                fname: newVoter.fname,
                gname: newVoter.gname,
                email: newVoter.email,
                phone: newVoter.phone,
                id: newVoter.id,
                dept: newVoter.dept,
                year: newVoter.year,
                section: newVoter.section,
                fullName: newVoter.fullName,
                bio: req.body.bio,
                plans: req.body.plans,
                uniqueId: newVoter.uniqueID,
                role: "candidate"
            });
            await pending.save();
        }
        res.json({
            status: "success",
            code: 201,
            message: "User Added",
            data: newVoter,
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// get voter detail
router.get('/:id', cors(), async (req, res, next) => {
    try {
        var voter = await Voter.findOne({ _id: req.params.id });
        res.json({
            status: 'success',
            code: 200,
            data: voter
        })

    } catch (e) {
        res.json({
            status: "failed",
            code: 500,
            message: "Voter doesn't exist!"
        })
    }
});
module.exports = router;
