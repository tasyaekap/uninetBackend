const express = require("express");
const {
  login,
  registerUser,
} = require("../controllers/user");
 
const router = express.Router();
 
router.route("/login").post(login);
router.route("/register").post(registerUser);

module.exports = router;