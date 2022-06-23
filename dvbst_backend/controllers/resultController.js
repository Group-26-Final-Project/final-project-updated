const express = require('express');
const Election = require('../models/election');
const router = express.Router()
var cors = require('cors')
const CompletedElections = require("../models/completed");
const ArchivedElections = require("../models/archive");

//get election result
router.get('/:id', cors(), async (req, res, next) => {
    try {
        var election = await Election.findOne({_id: req.params.id})
        if(!election) election = await CompletedElections.findOne({_id: req.params.id});
        if(!election){
            const temp = await ArchivedElections.findOne({year:2022});
            election = temp.elections.find(e => e._id.toString() === req.params.id);
        } 
        var results = [];
        for (var i = 0; i < election.candidates.length; i++) {
            var result = {
                name: election.candidates[i].name,
                fname: election.candidates[i].fname,
                gname: election.candidates[i].gname,
                voteCount: election.candidates[i].voteCount
            };
            results.push(result);
        }
        res.json({
            status: 'success',
            code: 200,
            data: results.sort((a, b) => b.voteCount - a.voteCount || a.name.localeCompare(b.name))
        })
    } catch (e) {
        res.json({
            status: 'err',
            code: 500,
            message: "Can't get Election Results",
        });
    }
});

module.exports = router