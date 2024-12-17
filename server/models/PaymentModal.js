const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    }, // Reference to users collection,
    orderID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
      required: true,
    }, // Reference to users collection,
    tranNum: { type: String, required: true, trim: true },
    mobileNum: { type: String, required: true, trim: true },
    price: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const PaymentModel = mongoose.model("payments", DataSchema);

module.exports = PaymentModel;
