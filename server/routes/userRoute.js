const express = require("express");

const AuthVerification = require("../middlewares/AuthVerification");
const {
  registerUser,
  loginUser,
  UserProfileDetails,
  logoutUser,
  GetUserByParams,
  updateUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

userRouter.get("/getProfile", AuthVerification, UserProfileDetails);
userRouter.get("/:id", AuthVerification, GetUserByParams);

// Update user by ID
userRouter.put("/updateUser/:id", AuthVerification, updateUser);


module.exports = userRouter;
