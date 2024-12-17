const express = require("express");
const {
  createPayment,
  getPaymentById,
  getAllPayments,
  checkPaymentByOrderID,
} = require("../controllers/PaymentController");
const AuthVerification = require("../middlewares/AuthVerification");


const router = express.Router();

// Create a new payment
router.post("/create",AuthVerification, createPayment);

// Get a single payment by ID
router.get("/:id", getPaymentById);

// Get all payments
router.get("/", getAllPayments);

// Check if a payment exists by orderID
router.get("/exists/:orderID",AuthVerification, checkPaymentByOrderID);

module.exports = router;
