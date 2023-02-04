import connectDB from "../../../../utils/connectDB";
import ContactInfo from "../../../../models/admin/contactInfo";
import auth from "../../../../middleware/auth";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await updateInfo(req, res);
      break;
  }
};

const updateInfo = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin")
      return res.status(400).json({ err: "Authentication is not valid" });

    const { description } = req.body;
    const {id} = req.query;
    console.log('id', req.query)
    await ContactInfo.findOneAndUpdate(
      { _id: id },
      {
        description,
      }
    );
    console.log("userData", req.body);
    res.json({
      msg: "Updated Successfully!",
      content: {
        description,
      },
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
