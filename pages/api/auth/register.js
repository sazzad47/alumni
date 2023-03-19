import connectDB from "../../../utils/connectDB";
import Otp from "../../../models/membershipOtp";
import Users from "../../../models/userModel";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;
  }
};

const register = async (req, res) => {
  try {
    const { registerData, code } = req.body;
    const { email, firstName, lastName, ssc_batch, phone } = registerData;
    let data = await Otp.findOne({
      $and: [{ email }, { code: parseInt(code) }],
    });

    if (!data) return res.status(400).json({ err: "Invalid OTP" });

    let currentTime = new Date().getTime();
    let diff = data.expireIn - currentTime;
    if (diff < 0) return res.status(400).json({ err: "OTP expired!" });

    const member = await Users.findOne({ email, membership: { $ne: "none" } });
    if (member)
      return res.status(400).json({ err: "This email already exists." });
    const incomplete = await Users.findOne({ email, membership: "none" });
    if (incomplete)
      return res
        .status(400)
        .json({ warning: "Please complete the payment process." });
    const newUser = new Users({
      firstName,
      lastName,
      ssc_batch,
      phone,
      email,
    });

    // const access_token = createAccessToken({ id: newUser._id });
    // const refresh_token = createRefreshToken({ id: newUser._id });
    await newUser.save();

    res.json({
      msg: "Email verified successfully!",
      // refresh_token,
      // access_token,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
