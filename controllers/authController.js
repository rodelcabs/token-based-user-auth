const SETTINGS = require("../SETTINGS");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const User = new UserModel();

const AUTHCONTROLLER = {
  authUser: asyncHandler(async function(credentials){
    try {
      let user = await User.findOne({email: credentials.email});
      if(user){
        let pwdMatch = await bcrypt.compare(credentials.password, user.password);
        if(pwdMatch){
          return user;
        }

        throw new Error("User not authenticated. Password didn't match.");
      } 

      throw new Error("User not authenticated. User doesn't exist.");
    } catch (error) {
      throw new Error(error.message? error.message: error);
    }
  }),
  generateAccessToken: function(user){
    try {
      const payload = {
        id: user.id,
        pwd: user.password
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.TOKEN_EXP});
      return token;
    } catch (error) { 
      throw new Error(error.message? error.message: error);
    }
  }
}

module.exports = AUTHCONTROLLER;
