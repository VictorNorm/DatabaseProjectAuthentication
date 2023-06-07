var express = require("express");
var router = express.Router();
var UserService = require("../services/UserService");
var db = require("../models");
var userService = new UserService(db);
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let users = await userService.getAll();
  res.jsend.success(users);
});

module.exports = router;
