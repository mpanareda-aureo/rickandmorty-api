const express = require("express");
const passport = require("passport");
const axios = require("axios");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const page =
      req.query.page && !isNaN(parseInt(req.query.page))
        ? Math.max(parseInt(req.query.page), 1)
        : 1;
    axios
      .get("https://rickandmortyapi.com/api/character/?page=" + page)
      .then((response) => {
        res.send({
          data: response.data.results,
          page: page,
          last: response.data.info.next === null,
        });
      })
      .catch((error) => {
        console.log(error);
        res.send({
          data: [],
          page: page,
          last: true,
          error: error.message,
        });
      });
  }
);

module.exports = router;
