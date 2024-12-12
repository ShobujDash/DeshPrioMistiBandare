const bcrypt = require("bcrypt");
const { v2 } = require("cloudinary");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const cookieToken = require("../utils/cookieToken");
const UserModel = require("../models/userModel");

// API to register user
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // validatin email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }

    // validating strong password
    if (password.length < 6) {
      return res.json({ success: false, message: "enter a strong password" });
    }

    // isExist user
    const isExistUser = await UserModel.findOne({ email });

    if (isExistUser) {
      return res
        .status(400)
        .json({ success: false, message: "User has already exist" });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new UserModel(userData);
    const user = await newUser.save();

    cookieToken(user, res);
  } catch (error) {
    next(error);
  }
};

// API for user login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user?.password);
    if (isMatch) {
      cookieToken(user, res);
    } else {
      res.status(400).json({ success: false, message: "invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
};

// get Profile data
const UserProfileDetails = async (req,res) => {
  try {
    let user_id = req.headers.id;

    let data = await UserModel.find({ _id: user_id }).select("-password");
     res.status(200).json({
       success: true,
       data:data[0]
     });
  } catch (error) {
    return { status: "fail", message: "Something went wrong" };
  }
};

// get single user for admin
const GetUserByParams = async (req,res) => {
  try {
    let { id } = req.params;

    let data = await UserModel.find({ _id: id }).select("-password").populate({
      path: "products.productId", // Path to populate
      model: "products", // Referencing the ProductModel
    });
        

    res.status(200).json({
      success: true,
      user: data[0],
    });
  } catch (error) {
    return { status: "fail", message: "Something went wrong" };
  }
};



// API for user logout
const logoutUser = (req, res) => {
  try {
    // Clear the cookie named 'token'
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while logging out",
    });
  }
};


// Get All Users For Admin
const getAllUsers = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await UserModel.find().select("-password");

    // If no users are found
    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Users found" });
    }

    // Respond with the list of categories
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
};


module.exports = {
  loginUser,
  registerUser,
  UserProfileDetails,
  logoutUser,
  getAllUsers,
  GetUserByParams,
};
