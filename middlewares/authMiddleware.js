const jwt = require("jsonwebtoken");
const SETTINGS = require("../SETTINGS");

const verifyAuth = (req,res,next) => {
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try {
      const user = req.session.user,
            token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded)
      console.log(user)
      if(decoded && decoded.id == user.id && decoded.pwd == user.password){
        return next();
      }
      else{
        token = null;
      }
    } catch (error) {
      res.status(SETTINGS.STATUS.UNAUTHORIZED)
      next(error);
    }
  }

  if (!token){
    res.status(SETTINGS.STATUS.UNAUTHORIZED);
    next("UnAuthorized: Invalid Access Token");
  }

}

module.exports = {
  verifyAuth
};
