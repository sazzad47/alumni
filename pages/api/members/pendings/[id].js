import connectDB from "../../../../utils/connectDB";
import Users from "../../../../models/userModel";
import Subscription from "../../../../models/admin/subscription";
import auth from "../../../../middleware/auth";
import sendEmail from "../../../../utils/mail";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await updateStatus(req, res);
      break;
    case "DELETE":
      await deleteMember(req, res);
      break;
  }
};

const updateStatus = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== "admin" || !result.root)
      return res.status(400).json({ err: "Authentication is not valid" });
    const { id } = req.query;
    const { status } = req.body;
    const password = Math.floor(100000 + Math.random() * 900000);
    const passwordHash = await bcrypt.hash(`btri${password}`, 12);

    const member = await Users.findOne({ userId: id });
    const membership = member.membership;
    const subscription = await Subscription.findOne({ title: membership });
    const duration = subscription.per;
    let period;
    if (duration === "month") {
      period = 30 * 24 * 60 * 60 * 1000;
    }
    if (duration === "6 months") {
      period = 6 * 30 * 24 * 60 * 60 * 1000;
    }
    if (duration === "year") {
      period = 365 * 24 * 60 * 60 * 1000;
    }

    const updatedMember = await Users.findOneAndUpdate(
      { userId: id },
      {
        password: passwordHash,
        status,
        expireIn:
          status === "approved"
            ? new Date().getTime() + period
            : new Date().getTime(),
      }
    );

    if (status === "approved") {
      await sendEmail({
        to: updatedMember.email,
        from: process.env.SENDER_EMAIL,
        subject: "[BTRI School Alumni] Membership approved.",
        html: `
          <div>
            <p>Dear ${updatedMember.firstName} ${updatedMember.lastName}, </p>
            <p>We wish to inform you that your application for membership of BTRI School Alumni has been approved. Your password is btri${password}. You can change your password anytime you want from your settings. </p> 
            <p> You are welcome to make use of the alumni facilities immediately. Thank you.</p>
            <p>Sincerely,</p>
            <p>BTRI School Alumni Team</p>
          </div>
          `,
      });
    } else {
      await sendEmail({
        to: updatedMember.email,
        from: process.env.SENDER_EMAIL,
        subject: "[BTRI School Alumni] Membership declined.",
        html: `
        <div>
        <p>Dear ${updatedMember.firstName} ${updatedMember.lastName}, </p>
        <p>We are sorry to inform you that we could not verify your information. Please make sure you have provided with correct information. Thank you.</p> <br/>
        <p>Sincerely,</p>
        <p>BTRI School Alumni Team</p>
      </div>
            `,
      });
    }

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
