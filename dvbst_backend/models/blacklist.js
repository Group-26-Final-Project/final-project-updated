const mongoose = require('mongoose')

const blacklistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    studId: {
        type: String,
        required: true,
    },
    dateAdded: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Blacklist', blacklistSchema)
