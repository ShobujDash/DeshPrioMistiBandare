const mongoose = require("mongoose");

const StoreProductSchema = mongoose.Schema(
  {
    productName: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const StoreProductModel = mongoose.model("storeproduts", StoreProductSchema);

module.exports = StoreProductModel;
