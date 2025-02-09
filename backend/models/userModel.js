const mongoose = require("mongoose");
const userModel = mongoose.Schema(
  {
    name: { type: "String", required: true },
    phone: { type: "String", required: true },
    avatar: {
      type: "String",
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    role: {
      type: "String",
      enum: ["worker", "user", "admin"],
      default: "user",
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userModel);
module.exports = User;
