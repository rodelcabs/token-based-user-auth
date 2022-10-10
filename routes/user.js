const express = require("express");
const SETTINGS = require("../SETTINGS.js");
const USERCONTROLLER = require("../controllers/userController");
const router = express.Router();

// get the current logged in user
router.get("/:userId", USERCONTROLLER.getUser);

router.post("/accessToken", async(req, res) =>{
  res.json("access token")
})

module.exports = router;
