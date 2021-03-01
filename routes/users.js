var express = require("express");
const passport = require("passport");
var router = express.Router();
const User = require("../models/user");

/* Get User */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.get(req.user.id, (err, result) => {
      if (err) throw err;

      res.send({ data: result });
    });
  }
);

module.exports = router;
