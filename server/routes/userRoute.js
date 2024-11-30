const express = require("express");
const {
  loginUser,
  registerUser,
  UserProfileDetails,
} = require("../controllers/UserController");
const AuthVerification = require("../middlewares/AuthVerification");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/getProfile", AuthVerification, UserProfileDetails);


module.exports = userRouter;
