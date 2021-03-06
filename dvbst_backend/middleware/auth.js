const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user.js');

module.exports = async function (req, res, next)  {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token)
      return res.status(401).send("Access denied. No token provided.");
    const decoded = jwt.verify(token, config.secret);
    if (!decoded){
      return res.status(401).send("Unauthorized access");
    }
    req.user = decoded.id;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};