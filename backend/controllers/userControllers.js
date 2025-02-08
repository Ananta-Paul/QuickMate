const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generatejwtToken = require("../config/generatejwtToken");
const { veryfyOtp } = require("../controllers/otpController");
// {
//   _id: ObjectId,
//   email: String,
//   password: String,
//   role: "worker" | "employer" | "admin",
//   isVerified: Boolean,
//   createdAt: Date,
// }
const signupUser = asyncHandler(async (req, res) => {
  const { name, phone, avatar, role, status } = req.body;
  if (!name || !phone) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }
  const userExist = await User.findOne({ phone });
  if (userExist) {
    res.status(403);
    throw new Error("User already Exists");
  }
  if (!status || status !== "pending") {
    res.status(400);
    throw new Error("Please generate OTP first");
  }
  const user = await User.create({ name, phone, avatar, role });

  if (user) {
    res.status(201).json({ result: user, token: generatejwtToken(user._id) });
  } else {
    res.status(403);
    throw new Error("Failed to signup");
  }
});

const userAuth = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;
  const user = await User.findOne({ phone });
  if (user) {
    await veryfyOtp(phone, otp);
    res.status(200).json({
      result: user,
      token: generatejwtToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Phone number or OTP is incorrect");
  }
});
const getUsers = asyncHandler(async (req, res) => {
  const keyword = req.query
    ? {
        $or: [{ name: { $regex: req.query.search, $options: "i" } }],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.id } });
  res.send(users);
  // console.log(keyword);
});
const userUpdate = asyncHandler(async (req, res) => {
  const { avatar, name, isVerified, role } = req.body;

  // Create an update object and add properties if they exist
  const updateFields = {};
  if (avatar !== undefined) updateFields.avatar = avatar;
  if (name !== undefined) updateFields.name = name;
  if (isVerified !== undefined) updateFields.isVerified = isVerified;
  if (role !== undefined) updateFields.role = role;

  const updatedUser = await User.findByIdAndUpdate(req.id, updateFields, {
    new: true,
  });

  if (!updatedUser) {
    res.status(404);
    throw new Error("User not found");
  } else {
    res.json(updatedUser);
  }
});

const userDelete = asyncHandler(async (req, res) => {
  const user =
    req.params.id === "me"
      ? await User.findById(req.id)
      : await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  }
  res.status(404);
  throw new Error("User not found");
});
module.exports = { signupUser, userAuth, getUsers, userUpdate, userDelete };
