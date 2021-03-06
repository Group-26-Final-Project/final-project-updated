const nodemailer = require('nodemailer')
require('dotenv').config()

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    // service: 'Gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    },
});

var URL = ''

const send_magic_link = async (email, link, which) => {
    try {
        var subj, body;
        if (which === "login") {
            URL = "https://tubular-churros-16cbaf.netlify.app/login/enter/"
            subj = "Signin link"
            body = '<p>Welcome to our website. This is your link to sign in to your account: ' + (URL + email + '/' + link) + '</p><p>Needless to remind you not to share this link with anyone</p>'
        } else {
            // URL = "https://tubular-churros-16cbaf.netlify.app/verify/"
            URL = "http://localhost:3000/verify/"
            subj = "Voting Verification Link"
            body = '<p>This is your Voting Verification link: ' + (URL + email + '/' + link) + '</p><p>Click on the link and you will be redirected to the voting page</p>'
        }
    
        const mailOptions = {
            to: email,
            from: process.env.NODEMAILER_EMAIL,
            subject: subj,
            html: body
        }
        const response = await transport.sendMail(mailOptions)
        // console.log('Link sent 📬')
        return ({ ok: true, message: 'email sent' })
    }
    catch (err) {
        console.log("Something didn't work out 😭", err)
        return ({ ok: false, message: err })
    }
}

const send_password = async (email, otp) => {
    try {
        var subj, body;
        subj = "Password Reset"
        body = '<p>This is your password reset Otp :' + otp + '.' + '</p>'
    
        const mailOptions = {
            to: email,
            from: process.env.NODEMAILER_EMAIL,
            subject: subj,
            html: body
        }
        const response = await transport.sendMail(mailOptions)
        // console.log('Link sent 📬')
        return ({ ok: true, message: 'email sent' })
    }
    catch (err) {
        console.log("Something didn't work out 😭", err)
        return ({ ok: false, message: err })
    }
}

const send_notification = async (email) => {
    try {
        var subj, body;
        subj = "Can not register you to the system!"
        body = '<p>The information you provided on the registration form is incorrect. Try to re-register or contact the admin at group26aait@gmail.com</p>'
    
        const mailOptions = {
            to: email,
            from: process.env.NODEMAILER_EMAIL,
            subject: subj,
            html: body
        }
        const response = await transport.sendMail(mailOptions)
        // console.log('Link sent 📬')
        return ({ ok: true, message: 'email sent' })
    }
    catch (err) {
        console.log("Something didn't work out 😭", err)
        return ({ ok: false, message: err })
    }
}

const confirm_request = async (email, type) => {
    try {
        console.log("Confirm", email, type)
        var subj, body;
        subj = "Your request has been received!"
        if (type === "accept"){
            body = '<p>Your request has been processed and it has been approved. Thank you!</p>'
        } else {
            body = '<p>Your request has been processed and it has been rejected. Thank you!</p>'
        }
    
        const mailOptions = {
            to: email,
            from: process.env.NODEMAILER_EMAIL,
            subject: subj,
            html: body
        }
        const response = await transport.sendMail(mailOptions)
        console.log('Link sent 📬')
        return ({ ok: true, message: 'email sent' })
    }
    catch (err) {
        console.log("Something didn't work out 😭", err)
        return ({ ok: false, message: err })
    }
}

module.exports = { send_magic_link, send_password, send_notification, confirm_request }