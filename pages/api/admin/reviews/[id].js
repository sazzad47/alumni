import connectDB from "../../../../utils/connectDB";
import Reviews from "../../../../models/admin/reviews";
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

    const { avatar, name, profession, comment } = req.body;
    const {id} = req.query;
    await Reviews.findOneAndUpdate(
      { _id: id },
      {
        avatar, name, profession, comment
      }
    );
    const content = await Reviews.find();
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
      await Reviews.deleteOne( { _id: id } )
      const content = await Reviews.find();
      res.json({ msg: "Content deleted!", content });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  };
