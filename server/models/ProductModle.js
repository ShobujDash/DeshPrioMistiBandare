const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    categoryID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "categories",
    },
    productName: { type: String, required: true },
    title: { type: String, trim: true, required: true },
    shortDes: { type: String, trim: true, required: true },
    image: { type: String, trim: true, required: true },
    price: { type: String, trim: true, required: true },
    descountPrice: { type: String, trim: true },
    descount: { type: Boolean, trim: true, default: false },
    stock: { type: Boolean, default: true },
    imageId: { type: String, trim: true, require: true },
  },
  { timestamps: true, versionKey: false }
);

const ProductModel = mongoose.model("products", DataSchema);

module.exports = ProductModel;
