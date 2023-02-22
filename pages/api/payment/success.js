import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import Payment from "../../../models/payment";

connectDB();

export default async function updateDatabase(req, res) {
  try {
    const { tran_id, status } = req.body;
    if (status !== "VALID")
      return res.status(500).json({ msg: "Payment not valid" });

    const payment = await Payment.findOneAndUpdate({ tran_id }, { paid: true });
    const email = payment.email;

    await Users.findOneAndUpdate(
      { email },
      {
        $push: { payment: payment._id }, membership: payment.membership
      },
      { new: true }
    );
    
    res.json({ msg: "Payment successful" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}
