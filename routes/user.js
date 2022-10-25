const express = require("express");
const SETTINGS = require("../SETTINGS.js");
const USERCONTROLLER = require("../controllers/userController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", USERCONTROLLER.createUser);

// get the current logged in user 
router.get("/", authMiddleware.verifyAuth, USERCONTROLLER.getUser);

router.post("/accessToken", USERCONTROLLER.accessToken)

module.exports = router;
