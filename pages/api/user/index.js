import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await updateInfo(req, res);
      break;
    case "GET":
      await getUsers(req, res);
      break;
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid" });

    const users = await Users.find().select("-password");
    res.json({ users });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const updateInfo = async (req, res) => {
  try {
      const result = await auth(req, res);
      
    const {
      firstName,
      lastName,
      ssc_batch,
      placeOfBirth,
      dateOfBirth,
      currentLocation,
      profession,
      education,
      expertise,
      biography,
      socialLinks,
      avatar,
    } = req.body;

    
    const newUser = await Users.findOneAndUpdate(
      { _id: result.id },
      {
        firstName,
        lastName,
        ssc_batch,
        placeOfBirth,
        dateOfBirth,
        currentLocation,
        profession,
        education,
        expertise,
        biography,
        socialLinks,
        avatar,
      }
      );
     
    res.json({
      msg: "Update Success!",
      user: {
        firstName: firstName? firstName: result.firstName,
        lastName: lastName? lastName: result.lastName,
        ssc_batch: ssc_batch? ssc_batch: result.ssc_batch,
        placeOfBirth: placeOfBirth? placeOfBirth: result.placeOfBirth,
        dateOfBirth: dateOfBirth? dateOfBirth: result.dateOfBirth,
        currentLocation: currentLocation? currentLocation: result.currentLocation,
        profession: profession? profession: result.profession,
        education: education? education: result.education,
        expertise: expertise? expertise: result.expertise,
        biography: biography? biography: result.biography,
        socialLinks: socialLinks? socialLinks: result.socialLinks,
        avatar: avatar? avatar: result.avatar,
        email: newUser.email,
        role: newUser.role,
        id: result.id,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
