const SETTINGS = require("../SETTINGS");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const User = new UserModel();
const AUTHCONTROLLER = require("./authController");

const USERCONTROLLER = {
  getUser: asyncHandler(async function(req,res){
    try {
      const user = req.session.user,
            userCopy = JSON.parse(JSON.stringify(user));

      delete userCopy.id;
      delete userCopy.password;
      res.status(SETTINGS.STATUS.SUCCESS).json(userCopy);
    } catch (error) {
      throw new Error(error.message? error.message: error);
    }
  }),
  accessToken: asyncHandler(async function(req,res){
    try { 
      if(!req.body.credentials){
        res.status("400");
        throw new Error("User not authenticated. Credentials are required!");
      }

      const authenticatedUser = await AUTHCONTROLLER.authUser(req.body.credentials);
      if(authenticatedUser) req.session.user = authenticatedUser; // store to session for verification;

      const accessToken = AUTHCONTROLLER.generateAccessToken(authenticatedUser);

      res.status(SETTINGS.STATUS.SUCCESS).json({accessToken: accessToken, expires: process.env.TOKEN_EXP});
    } catch (error) {
      throw new Error(error.message? error.message: error);
    }
  }),
  createUser: asyncHandler(async function(req,res){
    try {
      const newUser = req.body;

      //validate email
      let checkEmail = await User.findOne({email: newUser.email});

      if(checkEmail){
        throw new Error("User Creation Error: Email Already Taken.");
      }

      //hash pw
      newUser.password = await bcrypt.hash(newUser.password, SETTINGS.SALTROUNDS);

      await User.create(newUser);
      res.status(SETTINGS.STATUS.CREATED).json(newUser); 
    } catch (error) { 
      throw new Error(error.message? error.message: error);
    }
  })
}

module.exports = USERCONTROLLER;
