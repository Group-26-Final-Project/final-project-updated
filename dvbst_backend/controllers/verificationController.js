const { Router } = require('express')
const router = Router()
var cors = require('cors')
const User = require('../models/user')
const config = require('../config')
const { v4: uuidv4 } = require('uuid');
const client = require("twilio")(config.accountSID, config.authToken)
const { send_magic_link } = require('./emailController')

router.post('/', cors(), async (req, res) => {
    try {
        const { email, link } = req.body;
        if (!email)
            return res.status(404).json("Email is required field!");
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json("Unable to verify user");
        else if (!link) {
            console.log("No magic")
            try {
                const user = await User.findOneAndUpdate(
                    { email: email },
                    { magicLink: uuidv4(), magicLinkExpired: false },
                    { returnDocument: 'after' }
                );
                await send_magic_link(email, user.magicLink, "verify")
                res.send({ ok: true, message: 'Hit the link in verify yourself!', email: email, link: user.magicLink })
            } catch (e) {
                return res.status(500).send('Plese try again , "Can not Login"');
            }
        } else if (user.magicLink === link && !user.magicLinkExpired) {
            try {
                await User.findOneAndUpdate(
                    { email: email },
                    { magicLinkExpired: true }
                )
                return res.status(200).json("Verification was Successful")

            } catch {
                return res.status(500).send('Plese try again , "Can not be verified at the moment"');
            }
        } else {
            return res.status(400).json("Magic link expired or incorrect");
        }
    } catch (error) {
        res.status(500).send('Plese try again , "Can not be verified at the moment"');
    };
});

//otp request
router.post("/mobile", cors(), async (req, res) => {
    try {
        console.log("OTP Request", req.body.email)
        const { email } = req.body;
        if (!email)
            return res.status(404).json("Email is required field!");
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json("Unable to verify user");
        client
            .verify
            .services(config.serviceID)
            .verifications
            .create({
                to: `+251${user.phone.substring(1)}`,
                channel: 'sms'
            })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((e) => {
                console.log(e)
                res.status(500).json("Something went wrong!")
            })
    } catch (e) {

    }
})

//otp verify
router.post("/otp", cors(), async (req, res) => {
    try {
        console.log("VErify got here")
        console.log(req.body)
        const { email, otp } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send("Email/Password is Incorrect");
        } else {
            client
                .verify
                .services(config.serviceID)
                .verificationChecks
                .create({
                    to: `+251${user.phone.substring(1)}`,
                    code: otp
                })
                .then((data) => {
                    console.log("Data", data)
                    // if (data.status == "success"){
                    res.status(200).json({ "data": data })
                    // } else {
                    //   res.status(400).send("Wrong OTP found!")

                })
                .catch((e) => {
                    res.status(500).send("Something went wrong!")
                })
        }

    } catch (e) {
        res.status(500).send("Something went wrong. Couldn't verify!")
    }
})


module.exports = router