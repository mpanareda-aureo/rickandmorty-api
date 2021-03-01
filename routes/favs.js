var express = require("express");
const passport = require("passport");
var router = express.Router();
const Fav = require("../models/fav");

/* Get All Favs */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Fav.getByUser(req.user.id, (err, result) => {
      if (err) throw err;

      res.send({ data: result });
    });
  }
);

/* Insert */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.id) {
      res.send({ result: "id is required" });
      return;
    }
    Fav.add(req.user.id, req.body.id, (err) => {
      if (err) throw err;

      Fav.getByUser(req.user.id, (err, result) => {
        if (err) throw err;

        res.send({ data: result });
      });
    });
  }
);

/* Delete */
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (!req.body.id) {
      res.send({ result: "id is required" });
      return;
    }
    Fav.remove(req.user.id, req.body.id, (err) => {
      if (err) throw err;

      Fav.getByUser(req.user.id, (err, result) => {
        if (err) throw err;

        res.send({ data: result });
      });
    });
  }
);

module.exports = router;
