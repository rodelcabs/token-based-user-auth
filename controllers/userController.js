const SETTINGS = require("../SETTINGS");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const USERCONTROLLER = {
  getUser: asyncHandler(async function(req,res){
    try {
      const userId = req.params.userId;
      let userModel = new User(),
          user = await userModel.getOne(userId);
 
      res.status(SETTINGS.STATUS.SUCCESS).json(user.data);
    } catch (error) {
      throw new Error(error.message? error.message: error);
    }
  })
}

module.exports = USERCONTROLLER;
