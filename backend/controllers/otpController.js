const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const getOTP = asyncHandler(async (req, res) => {
  const { phone } = req.query;
  //   console.log(req.query);

  const verification = await client.verify.v2
    .services("VAc79c290bea9b72ea8efc42b590ad6832")
    .verifications.create({ to: `+91${phone}`, channel: "sms" });
  //   console.log("v", verification);
  if (verification.status === "pending") {
    res.status(200).json({ message: "OTP sent successfully" });
  } else {
    res.status(400).json({ message: "OTP not sent" });
  }
});

const verifyOTP = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;
  const verificationCheck = await client.verify.v2
    .services("VAc79c290bea9b72ea8efc42b590ad6832")
    .verificationChecks.create({ to: `+91${phone}`, code: otp });
  if (verificationCheck.status !== "approved") {
    //     res.status(200).json({ message: "OTP verified successfully" });
    //   } else {
    res.status(400).json({ message: "OTP not verified" });
  }
});

module.exports = { getOTP, verifyOTP };
