const express = require("express");

const AuthVerification = require("../middlewares/AuthVerification");
const { registerUser, loginUser, UserProfileDetails } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/getProfile", AuthVerification, UserProfileDetails);


module.exports = userRouter;
