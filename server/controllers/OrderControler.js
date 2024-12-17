const OrderModel = require("../models/OrderModel");

// Create a new order
const createOrder = async (req, res) => {
  try {
    let user_id = req.headers.id;

    const { cartList, totalPrice, payment, order } = req.body;

    const newOrder = new OrderModel({
      userID: user_id,
      cartList,
      totalPrice
    });

    const savedOrder = await newOrder.save();
    res
      .status(201)
      .json({
        success: true,
        order: savedOrder,
        message: "We take your order",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get orders by userID
const getOrdersByUserID = async (req, res) => {
  try {
    let user_id = req.headers.id;

    // Find orders with the matching userID
    const orders = await OrderModel.find({ userID: user_id })
      .populate("cartList.productID")
      .sort({ createdAt: -1 }); // Sort in descending order of createdAt;

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found for this user." });
    }

    res.status(200).json({ success: true, orders: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("userID cartList.productID")
      .sort({ createdAt: -1 }); // Sort in descending order of createdAt;
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single order by ID
const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await OrderModel.findById(id).populate(
      "userID cartList.productID"
    );
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update an order by ID
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedOrder = await OrderModel.findByIdAndUpdate(id, updates, {
      new: true,
    }).populate("userID cartList.productID");

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await OrderModel.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUserID,
};
