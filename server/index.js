const express = require("express");
const userRouter = require("./routes/userRoute")
const app = new express();
const dotenv = require("dotenv").config();

// Security Middleware lib Import
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Database Lib Import
const mongoose = require("mongoose");
const connectDB  = require("./config/db");
const  connectCloudinary  = require("./config/cloudinary");

// let URL = process.env.MONGO_URL;
connectDB();
// connectCloudinary();

// Security Middleware Implement
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// Request Rate Limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

// Routing Implement
app.use("/api/user", userRouter);

// Undefined Route Implement
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not found" });
});

// error handeling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("App Run @5010");
});