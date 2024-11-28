const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png",
    },
    address: { type: String ,default:"Laksam" },
    gender: { type: String, default: "Not Selected" },
    phone: { type: String, default: "0000000000" },
    isAdmin:{type:Boolean,default:false}
  },
  { timestamps: true }
);

const UserModel = mongoose.models.user || mongoose.model("user", userSchema);

module.exports = UserModel;
