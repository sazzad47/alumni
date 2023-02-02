import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import Otp from "../../../models/membershipOtp";
import sendEmail from "../../../utils/mail";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await sendMessage(req, res);
      break;
  }
};

const sendMessage = async (req, res) => {
  try {
    const { fullName, email, ssc_batch, message, userEmail } = req.body;

    console.log('message', req.body)
    await sendEmail({
        to: userEmail,
        from: process.env.SENDER_EMAIL,
        subject: `[BTRI School Alumni] Message from ${fullName}.`,
        html: `
              <div>
                <p>Name: ${fullName}</p>
                <p>Batch: ${ssc_batch}</p>
                <p>Email: ${email}</p><br/>
                <p>${message}</p>
              </div>
              `,
      });
    res.json({
      msg: "Message sent successfully",
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
