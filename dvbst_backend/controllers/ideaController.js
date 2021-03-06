const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Idea = require('../models/idea')
const config = require('../config')
var cors = require('cors')


router.get('/', cors(), async function (req, res) {
    try {
        var token = req.headers.authorization;
        token = token.split(" ")[1];
        var decoded = jwt.decode(token, config.secret);
        const ideas = await Idea.find().lean()
        const response = ideas.map(idea => {
            idea.likedUser = idea.likes.includes(decoded.id)
            idea.likes = []
            return idea
        })
        res.json(response);
    } catch (err) {
        res.status(500).json({ message: "Can't get Ideas" });
    }
});

router.post('/', cors(), async function (req, res) {
    try {
        const idea = new Idea({
            username: req.body.username,
            title: req.body.title,
            description: req.body.description
        })
        const newIdea = await idea.save()
        res.status(201).json(newIdea)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', cors(), async function (req, res) {
    try {
        var token = req.headers.authorization;
        token = token.split(" ")[1];
        var decoded = jwt.decode(token, config.secret);
        console.log(decoded)
        const idea = await Idea.findOne({ _id: req.params.id })
        if (!idea) {
            return res.status(200).send("No ideas yet!");
        } else {
            if (idea.likes.includes(decoded.id)) {
                idea.likes = (idea.likes).filter(e => e !== decoded.id)
                idea.likeCount--
            } else {
                idea.likes.push(decoded.id)
                idea.likeCount++
            }
        }
        const updatedIdea = await idea.save()
        res.json(updatedIdea)
    } catch (err) {
        res.status(400).json({ message: "Can't update Vote count" })
    }
});

module.exports = router