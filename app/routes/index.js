const router = require("express").Router();
const passport = require("passport");
const passwordUtils = require("../lib/passwordUtils");
const connection = require("../config/database");
const User = connection.models.User;

router.use('/users', require('./user.routes'))

module.exports = router;
