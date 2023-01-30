import jwt from "jsonwebtoken";
import Users from "../models/userModel";

const auth = async (req, res) => {
  const token = req.headers.authorization;
  if (!token) return res.status(400).json({ err: "Invalid Authentication." });
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (!decoded) return res.status(400).json({ err: "Invalid Authentication." });
  const user = await Users.findOne({ _id: decoded.id });
  return {
    id: user._id,
    email: user.email,
    userId: user.userId,
    firstName: user.firstName,
    lastName: user.lastName,
    ssc_batch: user.ssc_batch,
    placeOfBirth: user.placeOfBirth,
    dateOfBirth: user.dateOfBirth,
    currentLocation: user.currentLocation,
    education: user.education,
    profession: user.profession,
    expertise: user.expertise,
    biography: user.biography,
    socialLinks: user.socialLinks,
    status: user.status,
    subscription: user.subscription,
    role: user.role,
    avatar: user.avatar,
    root: user.root,
  };
};

export default auth;
