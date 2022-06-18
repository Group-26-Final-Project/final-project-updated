const mongoose = require('mongoose')

const archiveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    elections: {
        type: Array,
        required: true,
    },
})

module.exports = mongoose.model('Archive', archiveSchema)
