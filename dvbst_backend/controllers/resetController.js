
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const OTP = require('../models/otp')
const config = require("../config");
const bcrypt = require("bcryptjs");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const { send_password } = require("./emailController");

router.post("/", cors(), async (req, res, next) => {
    try {
        const { email } = req.body
        const otpCode = Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User not found!' })
        }

        const filter = { email: email };
        const update = { email: email, code: otpCode, createdAt: new Date() };

        const otp = new OTP({
            email: email,
            code: otpCode,
            createdAt: new Date()
        });

        var present = await OTP.findOne({email})
        if (!present) {
            await otp.save()
        } else{
            await OTP.findOneAndUpdate(filter, update, {
                new: true
            });
        }

        await send_password(email, otpCode);

        return res.status(201).json({
            message:
                'Password reset email has been sent. Please check your email within the next hour.'
        })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

router.post("/confirm", cors(), async (req, res, next) => {
    try {
        const { email, code } = req.body
        console.log(req.body)
        const otp = await OTP.findOne({email: email })
        if (!otp) {
            return res.status(400).json({ message: 'Invalid OTP!' })
        }
        console.log(otp.code, code)
        if (otp.code !== code) {
            return res.status(400).json({ message: 'Invalid or Expired OTP!' })
        }
        await OTP.deleteOne({ email })
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User not found!' })
        }
        const resetToken = jwt.sign({ email }, config.resetPassword, {
            expiresIn: '600s'
        })
        return res.status(201).json({ resetToken, message: 'OTP verified' })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

router.post("/newpass", cors(), async (req, res, next) => {
    try {
        const { resetToken, password } = req.body
        console.log(resetToken, password, "Here")
        const decoded = jwt.verify(resetToken, config.resetPassword)
        const email = decoded.email || ''
        if (email == '') {
            return res.status(400).json({
                message: 'Invalid token given'
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User not found!' })
        }
        user.password = hashedPassword
        await user.save()
        return res.status(201).json('Password reset successfully')
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
})

module.exports = router;