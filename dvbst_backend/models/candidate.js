const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    dept: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    section: {
        type: Number,
        required: true,
    },
    bio: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: false,
    },
    wallet: {
        type: String,
        required: false,
        default: '',
    },
    voteCount: {
        type: Number,
        required: true,
        default: 0
    },
    fullName: {
        type: String, 
        require: true
    },
    status: {
        type: Boolean,
        require: true,
        default: true
    }
})

module.exports = mongoose.model('Candidate', candidateSchema)
