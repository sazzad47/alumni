import connectDB from "../../../../utils/connectDB";
import Users from "../../../../models/userModel";
import auth from "../../../../middleware/auth";
import sendEmail from "../../../../utils/mail";


connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
        await getMember(req, res);
        break;
    case "PATCH":
      await cancelMembership(req, res);
      break;
    case "DELETE":
      await deleteMember(req, res);
      break;
  }
};

const getMember = async (req, res) => {
    try {
        const member = await Users.findOne({_id: req.query.id})
        console.log('id', member)
      
      res.status(200).json({
        data: member,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

const cancelMembership = async (req, res) => {
  try {
    const result = await auth(req, res);
      if (result.role !== "admin" || !result.root)
        return res.status(400).json({ err: "Authentication is not valid" });
    const { id } = req.query;
    const { subscription } = req.body;
   
    const member = await Users.findOneAndUpdate(
      { userId: id },
      { subscription }
      )
      
    
      await sendEmail({
        to: member.email,
        from: process.env.SENDER_EMAIL,
        subject: "[BTRI School Alumni] Membership canceled.",
        html: `
          <div>
            <p>Dear ${member.firstName} ${member.lastName}, </p>
            <p>We are sorry to inform you that your membership of BTRI School Alumni has been canceled. </p> 
            <p> Please renew your membership to make use of the alumni facilities immediately. Thank you.</p>
            <p>Sincerely,</p>
            <p>BTRI School Alumni Team</p>
          </div>
          `,
      });

    res.json({ msg: "Success!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteMember = async (req, res) => {
  try {
    const { id } = req.query;
    await Users.findOneAndUpdate(
      { userId: id },
      {
        deleted: true,
      }
    );
    res.json({ msg: "Member deleted!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
