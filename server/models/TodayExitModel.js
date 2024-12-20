const mongoose = require("mongoose");

const ExitSchema = mongoose.Schema(
  {
    productName: { type: String, trim: true, required: true },
    qnt: { type: String, trim: true, required: true },
    price: { type: String, trim: true },
  },
  { timestamps: true, versionKey: false }
);

const TodayExitModel = mongoose.model("todayexits", ExitSchema);

module.exports = TodayExitModel;
