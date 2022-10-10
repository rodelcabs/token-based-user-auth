const axios = require("axios");
const SETTINGS = require("../SETTINGS");

// User object model representing a table of fake database (json-server)
class User {
  constructor(){}

  async getAll() {
    try {
      const users = await axios.get(SETTINGS.USERSURL);
      return users;
    }
    catch (error) {
      throw new Error(error.message? error.message: error);
    }
  }

  async getOne(id){
    try {
      if(!id){
        throw "ID is required";
      }
      // const user = await axios.get(`${SETTINGS.USERSURL}?id=${id}`);
      const userResponse = await axios.get(`${SETTINGS.USERSURL}?id=${id}`);
      return userResponse.data[0];
    } catch (error) { 
      throw new Error(error.message? error.message: error);
    }
  }

  async findOne(query){
    try {
      let queryString = Object.keys(query)
        .map(key => `${key}=${query[key]}`)
        .join("&");

      const userResponse = await axios.get(`${SETTINGS.USERSURL}?${queryString}`);
      return userResponse.data[0];
    } catch (error) {
      throw new Error(error.message? error.message: error);
    }
  }
}

module.exports = User;
