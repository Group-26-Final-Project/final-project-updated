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
    var subj, body;
    if (which === "login") {
        URL = "http://localhost:3000/login/enter/"
        subj = "Signin link"
        body = '<p>Welcome to our website. This is your link to sign in to your account: ' + (URL + email + '/' + link) + '</p><p>Needless to remind you not to share this link with anyone</p>'
    } else {
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
    try {
        const response = await transport.sendMail(mailOptions)
        // console.log('Link sent 📬')
        return ({ ok: true, message: 'email sent' })
    }
    catch (err) {
        console.log("Something didn't work out 😭", err)
        return ({ ok: false, message: err })
    }
}

module.exports = { send_magic_link }