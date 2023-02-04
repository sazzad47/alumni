import connectDB from "../../../../utils/connectDB";
import Media from "../../../../models/admin/media";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await updateContent(req, res);
      break;
    case "DELETE":
      await deleteContent(req, res);
      break;
  }
};

const updateContent = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid" });

    const { file, caption, addToHome } = req.body;
    const {id} = req.query;
    console.log('id', id)
    await Media.findOneAndUpdate(
      { _id: id },
      {
        file, caption, addToHome
      }
    );
    const content = await Media.find();
    res.json({
      msg: "Updated Successfully!",
      content
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteContent = async (req, res) => {
    try {
      const { id } = req.query;
      await Media.deleteOne( { _id: id } )
      const content = await Media.find();
      res.json({ msg: "Content deleted!", content });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  };
