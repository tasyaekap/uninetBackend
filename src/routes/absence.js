const express = require("express");
const {
    absence
} = require("../controllers/absence");
 
const router = express.Router();
 
router.route("/").post(absence);
 
module.exports = router;