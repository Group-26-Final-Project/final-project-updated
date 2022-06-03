const mongoose = require('mongoose')

const voterSchema = new mongoose.Schema({
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
    wallet: {
        type: String,
        required: false,
        default: '',
    }, 
    fullName: {
        type: String, 
        require: true
    }
})

module.exports = mongoose.model('Voter', voterSchema)
