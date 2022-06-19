const mongoose = require('mongoose')

const completedSchema = new mongoose.Schema({
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
    candidates: {
        type: Array,
        required: true,
    },
    winners: {
        type: Array,
        required: false,
    },
    type: {
        type: String,
        required: false,
        default: "section",
    },
})

module.exports = mongoose.model('Completed', completedSchema)
