const jwt = require("jsonwebtoken");
const { DecodeToken } = require("../helpers/decodeToken");


module.exports = (req, res, next) => {
  let { token } = req.headers; // token from others
  if (!token) {
    token = req.cookies["token"]; // token form web
  }

  let decoded = DecodeToken(token);
  if (decoded === null) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  } else {
    let { userId, isAdmin } = decoded;
  
    req.headers.id = userId;
    req.headers.isAdmin = isAdmin;
    next();
  }
};
