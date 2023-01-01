import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import valid from "../../../utils/valid";
import bcrypt from "bcrypt";
import {
  createAccessToken,
  createRefreshToken,
} from "../../../utils/generateToken";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await googleLogin(req, res);
      break;
  }
};

const googleLogin = async (req, res) => {
  try {
    const { userData } = req.body;
    const { email, name } = userData;
    const password = email + process.env.GOOGLE_CLIENT_SECRET;
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await Users.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });
      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.json({
        msg: "Login Success!",
        refresh_token,
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } else {
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });
      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });
      await newUser.save();
      res.json({
        msg: "Login Success!",
        refresh_token,
        access_token,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    }
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
