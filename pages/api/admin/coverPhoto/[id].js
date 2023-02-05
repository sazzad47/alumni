import connectDB from "../../../../utils/connectDB";
import CoverPhoto from "../../../../models/admin/coverPhoto";
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

    const { file, caption, addToGallery } = req.body;
    const {id} = req.query;
    await CoverPhoto.findOneAndUpdate(
      { _id: id },
      {
        file, caption, addToGallery
      }
    );
    const content = await CoverPhoto.find();
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
      await CoverPhoto.deleteOne( { _id: id } )
      const content = await CoverPhoto.find();
      res.json({ msg: "Content deleted!", content });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  };
