const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = (req, res, next) => {
  if (req.headers.authorization)
    return res.status(401).send("Access denied. No token provided.");
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decodedToken = jwt.verify(token, config.secret);
    req.user = decodedToken;
    next();
  } catch {
    res.status(401).json({
      error: new Error('Invalid Token!')
    });
  }
};