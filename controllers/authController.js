const SETTINGS = require("../SETTINGS");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const User = new UserModel();

const AUTHCONTROLLER = {
  getToken: asyncHandler(async function(req,res){
    try {
      const credentials = req.body.credentials;
      if(!credentials){
        res.status("400");
        throw new Error("User not authenticated. Credentials are required!");
      }
      
      let user = User.findOne({email: credentials.email});
      if(user){

      } 
    } catch (error) {
      throw new Error(error.message? error.message: error);
    }
  })
}

module.exports = AUTHCONTROLLER;
