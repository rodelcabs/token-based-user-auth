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
    UNAUTHORIZED: 401,
    SERVERERROR: 500
  },
  SALTROUNDS: 10
}

module.exports = SETTINGS;

