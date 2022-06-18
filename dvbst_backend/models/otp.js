const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
    }
})

module.exports = mongoose.model('OTP', otpSchema)
