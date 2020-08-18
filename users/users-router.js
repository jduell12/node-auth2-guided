const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");
const { orWhereNotExists } = require("../database/connection.js");

router.get("/", restricted, (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json({ data: users, jwt: req.decodedToken });
    })
    .catch((err) => res.send(err));
});

router.put("/:id", restricted, checkRole(["admin"]), (req, res) => {
  res.status(200).json({ message: "success" });
});

function checkRole(roles) {
  return function (req, res, next) {
    roles.forEach((role) => {
      if (req.decodedToken.role === role) {
        next();
      } else {
        res.status(403).json({ message: "You don't have access to this" });
      }
    });
  };
}

module.exports = router;
