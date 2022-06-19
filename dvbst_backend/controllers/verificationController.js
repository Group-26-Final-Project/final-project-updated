const { Router } = require('express')
const router = Router()
var cors = require('cors')
const User = require('../models/user')
const config = require('../config')
const { v4: uuidv4 } = require('uuid');
const { send_magic_link } = require('./emailController')

router.post('/', cors(), async (req, res) => {
    const { email, link } = req.body;
    if (!email)
        return res.status(404).json("Email is required field!");
    try {
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

module.exports = router