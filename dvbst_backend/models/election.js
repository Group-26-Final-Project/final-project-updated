const mongoose = require('mongoose')

const electionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    department: {
        type: Number,
        required: true,
    }, 
    batch: {
        type: Number,
        required: false,
    },
    section: {
        type: Number,
        required: false,
    },
    voters: {
        type: Array,
        required: true,
    },
    candidates: {
        type: Array,
        required: true,
    }
})

module.exports = mongoose.model('Election', electionSchema)
