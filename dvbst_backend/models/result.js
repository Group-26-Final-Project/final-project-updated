const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true,
    },
    gname: {
        type: String,
        required: true,
    },
    voteCount: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Result', resultSchema)
