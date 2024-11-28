const jwt = require("jsonwebtoken");

const getJwtToken = (userId,isAdmin) => {
  return jwt.sign({ userId: userId,isAdmin:isAdmin }, process.env.JWT_SECREAT, {
    expiresIn: "1 day",
  });
};


module.exports = getJwtToken;