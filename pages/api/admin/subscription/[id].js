import connectDB from "../../../../utils/connectDB";
import Subscription from "../../../../models/admin/subscription";
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

    const { title, facilities, price, per, currency } = req.body;
    const { id } = req.query;
    await Subscription.findOneAndUpdate(
      { _id: id },
      {
        title,
        facilities,
        price,
        per,
        currency
      }
    );
    const content = await Subscription.find();
    res.json({
      msg: "Updated Successfully!",
      content,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteContent = async (req, res) => {
  try {
    const { id } = req.query;
    await Subscription.deleteOne({ _id: id });
    const content = await Subscription.find();
    res.json({ msg: "Content deleted!", content });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
