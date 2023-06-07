var express = require("express");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var crypto = require("crypto");
var db = require("../models");
var UserService = require("../services/UserService");
var userService = new UserService(db);
const jsend = require("jsend");

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    userService.getOneByName(username).then((data) => {
      console.log(data);
      if (data === null) {
        return cb(null, false, { message: "Incorrect username or password." });
      }
      crypto.pbkdf2(
        password,
        data.Salt,
        310000,
        32,
        "sha256",
        function (err, hashedPassword) {
          if (err) {
            return cb(err);
          }
          if (!crypto.timingSafeEqual(data.EncryptedPassword, hashedPassword)) {
            return cb(null, false, {
              message: "Incorrect username or password.",
            });
          }
          return cb(null, data);
        }
      );
    });
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.Username });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

var router = express.Router();
router.use(jsend.middleware);

router.get("/login", function (req, res, next) {
  const username = req.user?.Username;
  res.render("login", { username });
});

router.post(
  "/login/password",
  passport.authenticate("local", {
    successReturnToOrRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true,
  })
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/signup", function (req, res, next) {
  res.render("signup");
});

router.post("/signup", async function (req, res, next) {
  if (req.body.Email == null || req.body.Email == undefined) {
    return res.jsend.fail({ result: "Email must be provided." });
  }
  let userEmailExists = await userService.getOneByEmail(req.body.Email);
  if (userEmailExists != null) {
    return res.jsend.fail({
      result: "An account is already registered to that email.",
    });
  }
  if (req.body.userName == null || req.body.userName == undefined) {
    return res.jsend.fail({ result: "Username must be provided." });
  }
  let userNameExists = await userService.getOneByName(req.body.userName);
  if (userNameExists != null) {
    return res.jsend.fail({
      result: "An account is already registered with that username.",
    });
  }
  if (req.body.firstName == null) {
    return res.jsend.fail({
      result: "First name must be provided.",
    });
  }
  if (req.body.lastName == null) {
    return res.jsend.fail({
      result: "Last name must be provided.",
    });
  }
  if (req.body.password == null) {
    return res.jsend.fail({
      result: "Password must be provided.",
    });
  }
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      userService.create(
        req.body.userName,
        req.body.firstName,
        req.body.lastName,
        req.body.Email,
        salt,
        hashedPassword
      );
      res.jsend.success("You successfully created an account.");
    }
  );
});

module.exports = router;
