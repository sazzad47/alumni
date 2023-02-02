import connectDB from "../../../../utils/connectDB";
import Users from "../../../../models/userModel";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await upload(req, res);
      break;
    case "GET":
      await getUploads(req, res);
      break;
  }
};

const upload = async (req, res) => {
  try {
    const { firstName, lastName, ssc_batch, avatar, email } = req.body;
    let user = await Users.findOne({ email });
    if (user)
      return res.status(400).json({ err: "This username already exists. Please try again with another username." });
      
    const newUser = new Users({
      firstName,
      lastName,
      ssc_batch,
      avatar,
      email,
      uploadedByAdmin: true,
      status: "approved"
    });

    await newUser.save();
    
    
    res.json({
      msg: "Uploaded successfully!",
      user: {
        ...newUser._doc,
        password: "",
      },
    });
    
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const getUploads = async (req, res) => {
    try {
      
      
      const uploads = await Users.find({uploadedByAdmin: true})
      const total = await Users.countDocuments();
      res.status(200).json({
        uploads,
        total
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
