const mongoose = require('mongoose')

const pendingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
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
    phone: {
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
    fullName: {
        type: String,
        require: true
    },
    bio: {
        type: String,
        default: '',
        required: true
    },
    plans: {
        type: String,
        default: '',
        required: true
    },
    role: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Pending', pendingSchema)
