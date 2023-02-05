import connectDB from "../../../utils/connectDB";
import Logo from "../../../models/admin/logo";
import auth from "../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getContent(req, res);
      break;
    case "PATCH":
      await updateContent(req, res);
      break;
  }
};

const updateContent = async (req, res) => {
    try {
      const result = await auth(req, res);
      if (result.role !== "admin")
        return res.status(400).json({ err: "Authentication is not valid" });
  
      const { file } = req.body;
      await Logo.findOneAndUpdate(
        { _id: '63dffa6a400aeb415eecfda4' },
        {
          file
        }
      );
      const content = await Logo.find();
      res.json({
        msg: "Updated Successfully!",
        content
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  };

const getContent = async (req, res) => {
  try {
    const content = await Logo.find();
    res.json({ content });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
