const express = require("express");
const {
    absence
} = require("../controllers/absence");
const verifyToken = require('../middleware/authMiddleware');
 
const router = express.Router();
 
router.route("/").post(verifyToken, absence);
 
module.exports = router;