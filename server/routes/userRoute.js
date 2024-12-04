const express = require("express");

const AuthVerification = require("../middlewares/AuthVerification");

const { registerUser, loginUser, UserProfileDetails, logoutUser } = require("../controllers/userController");



const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

userRouter.get("/getProfile", AuthVerification, UserProfileDetails);


module.exports = userRouter;
