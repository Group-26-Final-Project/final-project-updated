const { Router } = require("express");
const auth = require("../middleware/auth");
const router = Router();
const Admin = require("../models/admin");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { send_magic_link } = require("./emailController");
var cors = require("cors");

// Login router
router.post("/enter", cors(), async (req, res) => {
  const { email, link } = req.body;
  if (!email)
    return res.json({
      status: "failed",
      code: 404,
      message: "User not Found",
    });
  try {
    const user = await User.findOne({ email: email });
    if(!user) return res.status(400).json({ ok: false, message: "User not found" });
    else if (!link) {
      console.log(user);
      console.log("No magic");
      try {
        const user = await User.findOneAndUpdate(
          { email: email },
          { magicLink: uuidv4(), magicLinkExpired: false },
          { returnDocument: "after" }
        );
        await send_magic_link(email, user.magicLink, "login");
        res.send({ ok: true, message: "Hit the link in email to sign in", email:email, link:user.magicLink });
      } catch {
        res.json({
          status: "failed",
          code: 500,
          message: "Plese try again! Can not Login",
        });
      }
    } else if (user.magicLink == link && !user.magicLinkExpired) {
      const token = jwt.sign({ id: user.userId }, config.secret, {
        expiresIn: "24h",
      });
      try {
        await User.findOneAndUpdate(
          { email: email },
          { magicLinkExpired: true }
        );
        res.json({
          status: "success",
          code: 200,
          data: token,
          message: "Login was Successful",
        });
      } catch {
        res.status(500).send('Plese try again , "Can not Login"');
      }
    } else {
      return res.json({
        status: "failed",
        code: 400,
        message: "Magic link expired or incorrect",
      });
    }
  } catch (error) {
    res.status(500).send('Plese try again , "Can not Login"');
  }
});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("Email/Password is Incorrect");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(404).send("Email/Password is Incorrect");
    } else {
      const token = jwt.sign({ id: user.userId }, config.secret, {
        expiresIn: "24h",
      });
      res.status(200).json({ auth: true, token });
    }
  } catch (e) {
    res.status(500).send('Plese try again , "Can not Login"');
  }
});

router.post("/admin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return res.status(404).send("Email/Password is Incorrect");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!validPassword) {
      return res.status(404).send("Email/Password is Incorrect");
    } else {
      const token = jwt.sign({ id: admin._id }, config.secret, {
        expiresIn: "24h",
      });
      res.status(200).json({ auth: true, token });
    }
  } catch (e) {
    res.status(500).send('Plese try again , "Can not Login"');
  }
});

// Logout router

router.post("/logout", function (req, res) {
  res.status(200).send({ auth: false, token: null });
});

// [auth, hasRole(["admin", "voter", "candidate"])],

const verify_token = (req, res) => {
  const token = req.headers.authorization;
  jwt.verify(token, config.secret, (err, succ) => {
    err
      ? res.json({ ok: false, message: "something went wrong" })
      : res.json({ ok: true, succ });
  });
};

module.exports = router;
