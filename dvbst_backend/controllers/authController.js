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
const logger = require("../helpers/logger");

// Login router
router.post("/", cors(), async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
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

router.post("/admin", cors(), async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(404).send("Email/Password is Incorrect");
    }
    const validPassword = await bcrypt.compare(
      password,
      admin.password
    );
    if (!validPassword) {
      console.log("There")
      res.status(404).send("Email/Password is Incorrect");

      return logger.error(`404 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} `);

    } else {
      const token = jwt.sign({ id: admin._id }, config.secret, {
        expiresIn: "1h",
      });

      res.status(200).json(token);
      return logger.info(`200 || ${res.statusMessage} - Admin Login successful`);

    }
  } catch (e) {
    res.status(500).send('Plese try again , "Can not Login"');
    return logger.error(`500 || ${res.statusMessage} - - ${req.originalUrl} - ${req.method} Admin Login Unsuccesful`);

  }
});

// magic link verify
router.post("/enter", cors(), async (req, res) => {
  try {
    const { link } = req.body;
    const email = req.body.email.trim().toLowerCase()
    console.log("Enter value", email, link)
    if (!email){
      res.status(404).json("Email is required field!");
      return logger.error(`404 || ${res.statusMessage} - - ${req.originalUrl} - ${req.method} Email Verification Unsuccesful`);
  
    }
      
    const user = await User.findOne({ email: email });
    if (!user){
    res.status(400).json("User not found");

    return logger.error(`400 || ${res.statusMessage} - - ${req.originalUrl} - ${req.method} Email Verification Unsuccesful`);
    }
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
    logger.info(`200 || ${res.statusMessage} - Email Verification Sent`);

      } catch {
        res.status(500).send('Plese try again , "Can not Login"');
    return logger.error(`500 || ${res.statusMessage} - - ${req.originalUrl} - ${req.method} User Login Unsuccesful`);

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
        res.status(200).json(token);
    return logger.ifo(`200 || ${res.statusMessage} - User Login Succesful`);

      } catch {

        res.status(500).send('Plese try again , "Can not Login"');
    return logger.error(`500 || ${res.statusMessage} - - ${req.originalUrl} - ${req.method} User Login Unsuccesful`);

      }
    } else {
      res.status(400).json("Magic link expired or incorrect");
    return logger.error(`400 || ${res.statusMessage} - - ${req.originalUrl} - ${req.method} Magic Link Expired`);

    }
  } catch (error) {
    return res.status(500).send('Plese try again , "Can not Login"');
    return logger.error(`500 || ${res.statusMessage} - - ${req.originalUrl} - ${req.method} User Login Unsuccessful`);

  }
});


//mobile login
router.post("/mobile", cors(), async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json("Email/Password is Incorrect");
    return logger.error(`404 || ${res.statusMessage} - - ${req.originalUrl} - ${req.method} User Login Unsuccessful`);

    }
    const validPassword = await bcrypt.compare(
      password,
      user.password
    );
    if (!validPassword) {
      res.status(404).json("Email/Password is Incorrect");
    return logger.error(`404 || ${res.statusMessage} - - ${req.originalUrl} - ${req.method} User Login Unsuccessful`);

    } else {
      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: '1h',
      });
      res.status(200).json(token);
    return logger.ifo(`200 || ${res.statusMessage} - User Login Succesful`);

    }
  } catch (e) {
    console.log(e)
    res.status(500).send("Something went wrong")
    return logger.error(`500 || ${res.statusMessage} - - ${req.originalUrl} - ${req.method} Internal Server Error`);

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
      res.status(404).send("Email/Password is Incorrect");
    return logger.error(`404 || ${res.statusMessage} - - ${req.originalUrl} - ${req.method} User Verify Unsuccessful`);

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
     logger.ifo(`200 || ${res.statusMessage} - User Login Succesful`);

          } else {
            res.status(400).send("Wrong OTP found!")
    logger.error(`404 || ${res.statusMessage} - - ${req.originalUrl} - ${req.method} User Verify Unsuccessful`);

          }
        })
        .catch((e) => {
          res.status(500).send("Something went wrong!")
    logger.error(`500 || ${res.statusMessage} - - ${req.originalUrl} - ${req.method} Internal Server Error`);

        })
    }

  } catch (e) {
    res.status(500).send("Something went wrong. Couldn't verify!")
    return logger.error(`500 || ${res.statusMessage} - - ${req.originalUrl} - ${req.method} User Verify Unsuccessful`);

  }
})


// Logout router

router.post("/logout", auth, hasRole(["admin", "voter", "candidate"]), function (req, res) {
  res.status(200).send({ auth: false, token: null });
  logger.ifo(`200 || ${res.statusMessage} - User Logout Succesful`);

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
