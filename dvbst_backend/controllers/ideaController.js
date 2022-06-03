const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Idea = require('../models/idea')
const config = require('../config')
var cors = require('cors')


router.get('/', async function (req, res) {
	var token = req.headers.authorization;
    token = token.split(" ")[1];
    var decoded = jwt.decode(token, config.secret);
    try {
        const ideas = await Idea.find().lean()
        const response = ideas.map(idea => {
            idea.likedUser = idea.likes.includes(decoded.id)
            idea.likes = []
            return idea
        })
        res.json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async function (req, res) {
    const idea = new Idea({
        username: req.body.username,
        title: req.body.title,
        description: req.body.description
    })
    try {
        const newIdea = await idea.save()
        res.status(201).json(newIdea)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', async function (req, res) {
    const idea = await Idea.findOne({ _id: req.params.id })
    if (!idea) {
        return res.status(200).send("No ideas yet!");
    } else {
        if (idea.likes.includes(req.body.user_id)) {
            idea.likes = (idea.likes).filter(e => e !== req.body.user_id)
            idea.likeCount--
        } else {
            idea.likes.push(req.body.user_id)
            idea.likeCount++
        }
    }

    try {
        const updatedIdea = await idea.save()
        res.json(updatedIdea)
    } catch (err) {
        res.status(400).json({ message: "Can't update Vote count" })
    }
});

module.exports = router