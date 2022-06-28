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
      const token = jwt.sign({ id: user._id }, config.secret, {
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

//mobile login
router.post("/mobile", cors(), async (req, res) => {
  try {
    const { email, password } = req.body;
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
    return logger.info(`200 || ${res.statusMessage} - User Login Succesful`);

    }
  } catch (e) {
    // console.log(e)
    res.status(500).send("Something went wrong")
    return logger.error(`500 || ${res.statusMessage} - - ${req.originalUrl} - ${req.method} Internal Server Error`);

  }
})

// Logout router
router.post("/logout", function (req, res) {
  res.status(200).send({ auth: false, token: null });
  logger.info(`200 || ${res.statusMessage} - User Logout Succesful`);
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
