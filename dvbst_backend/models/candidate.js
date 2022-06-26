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
    bio: {
        type: String,
        default: ''
    },
    plans: {
        type: String,
        default: '',
    },
    // profile: {
    //     type: String,
    //     required: false,
    // },
    uniqueID: {
        type: String,
        required: false,
        default: '',
    },
    // completed: {
    //     type: Boolean,
    //     required: true,
    //     default: false,
    // },
    voteCount: {
        type: Number,
        required: true,
        default: 0
    },
    fullName: {
        type: String,
        require: true
    },
    // status: {
    //     type: Boolean,
    //     require: true,
    //     default: true
    // },
    // approved: {
	// 	type: Boolean,
	// 	required: true,
	// 	default: false
	// },
    role: {
        type: String,
        required: true,
        default: "candidate"
    },
})

candidateSchema.path('plans').required(function () {
    return this.completed
})
candidateSchema.path('bio').required(function () {
    return this.completed
})

module.exports = mongoose.model('Candidate', candidateSchema)
