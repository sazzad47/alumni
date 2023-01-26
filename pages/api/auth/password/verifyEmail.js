import connectDB from "../../../../utils/connectDB";
import Users from "../../../../models/userModel";
import Otp from "../../../../models/passwordResetOtp";
import bcrypt from "bcrypt";
import sendEmail from "../../../../utils/mail";
import { createRefreshToken } from "../../../../utils/generateToken";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await emailSend(req, res);
      break;
  }
};

const emailSend = async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({ err: "This email does not exist." });

    let otpCode = Math.floor(Math.random() * 10000 + 1);
    otpCode = parseInt(otpCode);
    let newOtp = new Otp({
      email: req.body.email,
      code: otpCode,
      expireIn: new Date().getTime() + 300 * 1000,
    });

    await newOtp.save();
    await sendEmail({
      to: req.body.email,
      from: process.env.SENDER_EMAIL,
      subject: "[BTRI School Alumni] Password Reset.",
      html: `
            <div>
              <p>Dear ${user.firstName} ${user.lastName},</p>
              <p>Your account recovery code is ${otpCode}. This will expire after 5 minutes.</p>
              <p>Thank you <br/>
               BTRI School Alumni Team</P>
            </div>
            `,
    });
    const refresh_token = createRefreshToken({ id: user._id });
    res.json({
      msg: "Please check your email",
      success: true,
      token: refresh_token
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
