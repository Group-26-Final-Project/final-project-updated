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
    year: {
        type: Number,
        required: false,
    },
    section: {
        type: Number,
        required: false,
    },
    startDate: {
        type: Number,
        required: false,
        default: 0,
    },
    endDate: {
        type: Number,
        required: false,
        default: 0,
    },
    status: {
        type: Number,
        required: true,
    },
    candidates: {
        type: Array,
        required: true,
    }
})

module.exports = mongoose.model('Election', electionSchema)
