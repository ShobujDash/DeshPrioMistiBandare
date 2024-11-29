const jwt = require("jsonwebtoken");
const { DecodeToken } = require("../helpers/decodeToken");


// module.exports = (req, res, next) => {
//   let { token } = req.headers; // token from others
//   if (!token) {
//     token = req.cookies["token"]; // token form web
//   }

//   let decoded = DecodeToken(token);
//   if (decoded === null) {
//     res.status(401).json({
//       success: false,
//       message: "Unauthorized",
//     });
//   } else {
//     let { userId, isAdmin } = decoded;
  
//     req.headers.id = userId;
//     req.headers.isAdmin = isAdmin;
//     next();
//   }
// };

// module.exports = (req, res, next) => {
//   let token = req.cookies["token"]; // Cookie থেকে টোকেন নিন

//   // যদি টোকেন না থাকে, হেডার থেকে চেষ্টা করুন
//   if (!token) {
//     token = req.headers.token;
//   }

//   if (!token) {
//     return res.status(401).json({ success: false, message: "Unauthorized" });
//   }

//   const decoded = DecodeToken(token);
//   if (!decoded) {
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }

//   req.headers.id = decoded.userId;
//   req.headers.isAdmin = decoded.isAdmin;
//   next();
// };


module.exports = (req, res, next) => {
  console.log("Cookies:", req.cookies); // Cookies ডিবাগ করুন
  const token = req.cookies["token"]; // টোকেন বের করুন

  if (!token) {
    console.log("Token not found in cookies");
    return res.status(401).json({ success: false, message: "Unauthorized" ,token});
  }

  try {
    const decoded = DecodeToken(token);
    req.headers.id = decoded.userId;
    req.headers.isAdmin = decoded.isAdmin;
    next();
  } catch (error) {
    console.error("Token decoding failed:", error);
    return res.status(401).json({ success: false, message: "Invalid Token" });
  }
};

