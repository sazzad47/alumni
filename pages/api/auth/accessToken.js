import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../../../utils/generateToken";

connectDB();

export default async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) return res.status(400).json({ err: "Please login now!" });
    const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
    if (!result)
      return res
        .status(400)
        .json({ err: "Your token is incorrect or has expired." });
    const user = await Users.findById(result.id);
    if (!user) return res.status(400).json({ err: "User does not exist." });
    const access_token = createAccessToken({ id: user._id });
    res.json({
      access_token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        ssc_batch: user.ssc_batch,
        phone: user.phone,
        placeOfBirth: user.placeOfBirth,
        dateOfBirth: user.dateOfBirth,
        currentLocation: user.currentLocation,
        education: user.education,
        profession: user.profession,
        expertise: user.expertise,
        biography: user.biography,
        socialLinks: user.socialLinks,
        status: user.status,
        membership: user.membership,
        expireIn: user.expireIn,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
