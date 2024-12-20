const mongoose = require("mongoose");

const StoreSchema = mongoose.Schema(
  {
    products: [
      {
        productName: { type: String, trim: true, required: true },
        qnt: { type: String, trim: true, required: true },
        price: { type: String, trim: true },
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const StoreModel = mongoose.model("stores", StoreSchema);

module.exports = StoreModel;
