import Users from "../../../../models/userModel";
import Payment from "../../../../models/payment";
import Subscription from "../../../../models/admin/subscription";

export default async function updateDatabase(req, res) {
  try {
    const { tran_id, status } = req.body;
    if (status !== "VALID")
      return res.status(500).json({ msg: "Payment not valid" });

    const payment = await Payment.findOneAndUpdate({ tran_id }, { paid: true });
    const email = payment.email;
    const subscription = await Subscription.findOne({ title: payment.membership });
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
    const member = await Users.findOne({ email });
    const previousExpireIn = member.expireIn;
    await Users.findOneAndUpdate(
      { email },
      {
        $push: { payment: payment._id }, membership: payment.membership, expireIn: new Date(previousExpireIn + period).getTime()

      },
      { new: true }
    );
    
    res.json({ msg: "Payment successful" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}
