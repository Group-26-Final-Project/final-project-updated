const { Router } = require('express')
const router = Router()
var cors = require('cors')
const User = require('../models/user')
const config = require('../config')
const { v4: uuidv4 } = require('uuid');
const { send_magic_link } = require('./emailController')

router.post('/', cors(), async (req, res) => {
    const { email, link } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!link) {
            console.log("No magic")
            try {
                const user = await User.findOneAndUpdate(
                    { email: email },
                    { magicLink: uuidv4(), magicLinkExpired: false },
                    { returnDocument: 'after' }
                );
                await send_magic_link(email, user.magicLink, "verify")
                res.send({ ok: true, message: 'Hit the link in verify yourself!',email:email, link:user.magicLink })
            } catch (e) {
                res.json({
                    status: "failed",
                    code: 500,
                    message: "Plese try again! Can not Verify now",
                });
            }
        } else if (user.magicLink == link && !user.magicLinkExpired) {
            try {
                await User.findOneAndUpdate(
                    { email: email },
                    { magicLinkExpired: true }
                )
                res.json({
                    status: "success",
                    code: 200,
                    message: "Verification was Successful"
                });
            } catch {
                res.status(500).send('Plese try again , "Can not be verified at the moment"');
            }
        } else {
            return res.json({
                status: "failed",
                code: 400,
                message: "Magic link expired or incorrect",
            });
        }
    } catch (error) {
        res.status(500).send('Plese try again , "Can not be verified at the moment"');
    };
});

module.exports = router