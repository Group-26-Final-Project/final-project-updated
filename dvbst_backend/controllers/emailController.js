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
        URL = "https://tubular-churros-16cbaf.netlify.app/login/enter/"
        subj = "Signin link"
        body = '<p>Welcome to our website. This is your link to sign in to your account: ' + (URL + email + '/' + link) + '</p><p>Needless to remind you not to share this link with anyone</p>'
    } else {
        URL = "https://tubular-churros-16cbaf.netlify.app/verify/"
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

const send_password = async (email, password) => {
    var subj, body;
    URL = "https://tubular-churros-16cbaf.netlify.app/login/enter/"
    subj = "Welcome to DVBST"
    body = '<p>Welcome to our website. This is your password for this account: ' + password + '</p><br><p>Please keep it somewhere safe. If you forget your password, contact the admin</p>'

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


module.exports = { send_magic_link, send_password }