import connectDB from "../../../../utils/connectDB";
import Content from "../../../../models/admin/event";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getContent(req, res);
      break;
    case "PATCH":
      await updateContent(req, res);
      break;
    case "DELETE":
      await deleteContent(req, res);
      break;
  }
};

const getContent = async (req, res) => {
  try {
    const content = await Content.findOne({ _id: req.query.id });

    res.status(200).json({
      data: content,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateContent = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid" });

    const {
      title,
      shortDescription,
      time,
      place,
      redirectionLink,
      photo,
      detailedPage,
    } = req.body;
    const { id } = req.query;
    await Content.findOneAndUpdate(
      { _id: id },
      {
        title,
        shortDescription,
        time,
        place,
        redirectionLink,
        photo,
        detailedPage,
      }
    );
    res.json({
      msg: "Updated Successfully!",
      content: {
        _id: id,
        title,
        shortDescription,
        time,
        place,
        redirectionLink,
        photo,
        detailedPage,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteContent = async (req, res) => {
  try {
    const { id } = req.query;
    await Content.deleteOne({ _id: id });
    res.json({ msg: "Content deleted!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
