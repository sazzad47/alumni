import Donation from "../../../models/donate";

export default async function updateDatabase(req, res) {
  try {
    const { tran_id, status } = req.body;
    if (status !== "VALID")
      return res.status(500).json({ msg: "Payment not valid" });

     await Donation.findOneAndUpdate({ tran_id }, { paid: true });
    
    res.json({ msg: "Payment successful" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}
