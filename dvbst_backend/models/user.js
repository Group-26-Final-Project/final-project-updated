const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    email: { 
		type     : String, 
		required : true,
		unique   : true
	},
	password: {
        type: String,
        required: true,
    },
	magicLink: { 
		type     : String, 
		required : false,
		unique   : false,
	},
	magicLinkExpired: { 
		type     : Boolean, 
		default  : false
	},
    role: {
        type: String,
        required: true,
        default: "voter"
    }
})

module.exports = mongoose.model('User', userSchema)
