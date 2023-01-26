import connectDB from "../../../../utils/connectDB";
import Users from "../../../../models/userModel";
import auth from "../../../../middleware/auth";
import bcrypt from "bcrypt";
import Otp from "../../../../models/passwordResetOtp";
import { createRefreshToken } from "../../../../utils/generateToken";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await verifyCode(req, res);
      break;
    case "PATCH":
      await changePassword(req, res);
      break;
  }
};

const verifyCode = async (req, res) => {
  const { email, otp } = req.body;

  try {
    let data = await Otp.findOne({ $and: [{ email }, { code: otp }] });
    if (!data) return res.status(400).json({ err: "Invalid OTP" });

    let currentTime = new Date().getTime();
    let diff = data.expireIn - currentTime;
    if (diff < 0) return res.status(400).json({ err: "OTP expired!" });
    const refresh_token = createRefreshToken({ id: data._id });
    res.json({
      msg: "Please reset your password",
      success: true,
      token: refresh_token
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
const changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await Users.findOne({ email });
    const passwordHash = await bcrypt.hash(password, 12);
    await Users.findOneAndUpdate({ email }, { password: passwordHash });
    const refresh_token = createRefreshToken({ id: user._id });
    res.json({ msg: "Password changed successfully!", token: refresh_token });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
