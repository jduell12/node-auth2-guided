const jwt = require("jsonwebtoken");
const constants = require("../config/constants");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    //need three things, token and then the secret followed by a callback function
    //callback function can return an error or the token decoded
    jwt.verify(token, constants.jwtSecret, (err, decodedToken) => {
      if (err) {
        //token not valid or was modified
        res.status(401).json({ message: "Invalid token" });
      } else {
        //token is good and have access to the information inside
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
