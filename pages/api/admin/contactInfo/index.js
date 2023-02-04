import connectDB from "../../../../utils/connectDB";
import ContactInfo from "../../../../models/admin/contactInfo";
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
    const { description } = req.body;
    const newContent = new ContactInfo({
      description,
    });
    await newContent.save();
    res.json({ msg: "Content added successfully" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const getContent = async (req, res) => {
  try {
    const content = await ContactInfo.find();
    res.json({ content });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
