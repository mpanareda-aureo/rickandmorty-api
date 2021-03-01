const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ err: "Wrong email or password" });
    }
    req.login(user, () => {
      const body = { _id: user.id, email: user.email };

      const token = jwt.sign({ user: body }, "jwt_secret");
      return res.json({ token });
    });
  })(req, res, next);
});

module.exports = router;
