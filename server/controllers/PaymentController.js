const OrderModel = require("../models/OrderModel");
const PaymentModel = require("../models/PaymentModal");

// Create a new payment
// const createPayment = async (req, res) => {
//   try {
//     let user_id = req.headers.id;
//     const { tranNum, mobileNum, price, orderID } = req.body;

//     const newPayment = new PaymentModel({
//       userID: user_id,
//       orderID,
//       tranNum,
//       mobileNum,
//       price,
//     });

//     const savedPayment = await newPayment.save();

//     res.status(201).json({
//       success: true,
//       message: "Payment created successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
const createPayment = async (req, res) => {
  try {
    let user_id = req.headers.id; // Retrieve the user ID from headers
    const { tranNum, mobileNum, price, orderID } = req.body;

    // Check if the provided orderID exists in the orders collection
    const order = await OrderModel.findById(orderID);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found with the provided orderID",
      });
    }

    // Create a new payment document
    const newPayment = new PaymentModel({
      userID: user_id,
      orderID,
      tranNum,
      mobileNum,
      price,
    });

    // Save the payment document
    const savedPayment = await newPayment.save();

    // Update the payment field in the orders collection to true
    order.payment = true;
    await order.save();

    res.status(201).json({
      success: true,
      message: "Payment created successfully, and order updated",
      data: savedPayment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single payment by ID
const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await PaymentModel.findById(id)
      .populate("userID")
      .populate("orderID");

    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }

    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await PaymentModel.find()
      .populate("userID")
      .populate("orderID")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get payment by orderID and check if it exists
const checkPaymentByOrderID = async (req, res) => {
  try {
    const { orderID } = req.params;

    const paymentExists = await PaymentModel.exists({ orderID });

    res.status(200).json({
      success: true,
      exists: paymentExists ? true : false,
      message: paymentExists
        ? "Payment exists for the provided orderID"
        : "No payment found for the provided orderID",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPayment,
  getPaymentById,
  getAllPayments,
  checkPaymentByOrderID,
};
