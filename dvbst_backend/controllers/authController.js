const { Router } = require("express");
const auth = require("../middleware/auth");
const hasRole = require("../middleware/hasRole");
const router = Router();
const Admin = require("../models/admin");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config");
const bcrypt = require("bcryptjs");
const client = require("twilio")(config.accountSID, config.authToken)
const { v4: uuidv4 } = require("uuid");
const { send_magic_link } = require("./emailController");
const cors = require('cors');

// Login router
router.post("/", cors(), async (req, res) => {
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
        expiresIn: '1h',
      });
      res.status(200).json(token);
    }
  } catch (e) {
    res.status(500).send('Plese try again , "Can not Login"');
  }
});

router.post("/admin", async (req, res) => {
  console.log("Request", req.body)
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
        expiresIn: "1h",
      });
      return res.status(200).json(token);
    }
  } catch (e) {
    res.status(500).send('Plese try again , "Can not Login"');
  }
});

// magic link verify
router.post("/enter", cors(), async (req, res) => {
  const { email, link } = req.body;
  console.log("Enter value", email, link)
  if (!email)
    return res.status(404).json("Email is required field!");
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json("User not found");
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
        res.send({ ok: true, message: "Hit the link in email to sign in", email: email, link: user.magicLink });
      } catch {
        return res.status(500).send('Plese try again , "Can not Login"');
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
        return res.status(200).json(token);
      } catch {
        return res.status(500).send('Plese try again , "Can not Login"');
      }
    } else {
      return res.status(400).json("Magic link expired or incorrect");
    }
  } catch (error) {
    return res.status(500).send('Plese try again , "Can not Login"');
  }
});


//mobile login
router.post("/mobile", cors(), async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json("Email/Password is Incorrect");
    }
    const validPassword = await bcrypt.compare(
      password,
      user.password
    );
    if (!validPassword) {
      return res.status(404).json("Email/Password is Incorrect");
    } else {
      const token = jwt.sign({ id: user.userId }, config.secret, {
        expiresIn: '1h',
      });
      res.status(200).json(token);
    }
  } catch (e) {
    console.log(e)
    return res.status(500).send("Something went wrong")
  }
})

//otp verify
router.post("/verify", cors(), async (req, res) => {
  console.log("VErify got here")
  try {
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
          if (data.status == "success") {
            const token = jwt.sign({ id: user.userId }, config.secret, {
              expiresIn: "24h",
            });
            res.status(200).json({ "data": data, "token": token })
          } else {
            res.status(400).send("Wrong OTP found!")
          }
        })
        .catch((e) => {
          res.status(500).send("Something went wrong!")
        })
    }

  } catch (e) {
    res.status(500).send("Something went wrong. Couldn't verify!")
  }
})


// Logout router

router.post("/logout", auth, hasRole(["admin", "voter", "candidate"]), function (req, res) {
  res.status(200).send({ auth: false, token: null });
});

// [auth, hasRole(["admin", "voter", "candidate"])],

// const verify_token = (req, res) => {
//   const token = req.headers.authorization;
//   jwt.verify(token, config.secret, (err, succ) => {
//     err
//       ? res.json({ ok: false, message: "something went wrong" })
//       : res.json({ ok: true, succ });
//   });
// };

module.exports = router;
