const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportJWT = require("passport-jwt");

const JWTStrategy = passportJWT.Strategy;

const loginRouter = require("./routes/login");
const favsRouter = require("./routes/favs");
const charactersRouter = require("./routes/characters");
const usersRouter = require("./routes/users");

const User = require("./models/user");

const app = express();
app.use(passport.initialize());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    (email, password, done) => {
      User.authenticate(email, password, (err, user) => {
        if (err) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "jwt_secret",
    },
    (jwt_payload, done) => {
      User.get(jwt_payload.user._id, (err, user) => {
        if (err) {
          return done(null, false, {
            message: "Token not matched",
          });
        } else {
          return done(null, user);
        }
      });
    }
  )
);

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/login", loginRouter);
app.use("/favs", favsRouter);
app.use("/characters", charactersRouter);
app.use("/users", usersRouter);

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
