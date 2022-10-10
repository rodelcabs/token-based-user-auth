const DBROUTE = 'http://localhost:3000';
const SETTINGS = {
  USERSURL: DBROUTE+"/users",
  AUTHROUTE: DBROUTE+"/users/accessToken",
  STATUS: {
    SUCCESS: 200,
    CREATED: 201,
    NOCONTENT: 204,
    BADREQ: 400,
    NOTFOUND: 404,
    SERVERERROR: 500
  }
}

module.exports = SETTINGS;

