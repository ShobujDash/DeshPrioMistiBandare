const mongoose = require("mongoose");

const EntrySchema = mongoose.Schema(
  {
    productName: { type: String, trim: true, required: true },
    qnt: { type: String, trim: true, required: true },
    price: { type: String, trim: true },
  },
  { timestamps: true, versionKey: false }
);

const TodayEntryModel = mongoose.model("todayentries", EntrySchema);

module.exports = TodayEntryModel;
