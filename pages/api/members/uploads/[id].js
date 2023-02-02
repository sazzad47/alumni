import connectDB from "../../../../utils/connectDB";
import Users from "../../../../models/userModel";
import auth from "../../../../middleware/auth";
import sendEmail from "../../../../utils/mail";


connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "DELETE":
      await deleteMember(req, res);
      break;
  }
};


const deleteMember = async (req, res) => {
  try {
    const { id } = req.query;
    await Users.deleteOne( { userId: id } )
    res.json({ msg: "Member deleted!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
