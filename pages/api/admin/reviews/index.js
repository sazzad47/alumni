import connectDB from "../../../../utils/connectDB";
import Reviews from "../../../../models/admin/reviews";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getContent(req, res);
      break;
    case "POST":
      await addContent(req, res);
      break;
  }
};

const addContent = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid" });
    const { avatar, name, profession, comment } = req.body;
    const newContent = new Reviews({
      avatar,
      name,
      profession,
      comment
    });
    await newContent.save();
    const content = await Reviews.find();
    res.json({ msg: "Content added successfully", content });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const getContent = async (req, res) => {
  try {
    const content = await Reviews.find();
    res.json({ content });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
