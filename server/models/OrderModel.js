const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    }, // Reference to users collection
    cartList: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" }, // Reference to products collection
        qnty: { type: Number, default: 1 }, // Quantity of the product
        price: { type: Number, required: true }, // Price of the product
      },
    ],
    totalPrice: { type: Number, required: true }, // Total price of the cart
    payment: { type: Boolean, default: false }, // Payment status
    order: {
      type: String,
      trim: true,
      enum: ["completed", "pending", "process"],
      default: "pending", // Default order status
    },
  },
  { timestamps: true, versionKey: false }
);

const OrderModel = mongoose.model("orders", DataSchema);

module.exports = OrderModel;



