import crypto from "crypto";
import * as SSLCommerzPayment from "sslcommerz-lts";

const storeID = process.env.SSL_STORE_ID;
const storePassword = process.env.SSL_STORE_PASSWORD;
const baseUrl = process.env.BASE_URL;

import Users from "../../../../models/userModel";
import Payment from "../../../../models/payment";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await initPayment(req, res);
      break;
  }
};

const initPayment = async (req, res) => {
  try {
    const { email, membership, currency, amount } = req.body;
    let user = await Users.findOne({ email });
    if (!user) return res.status(400).json({err: "Incorrect email! Please enter your registered email address."})
    const { firstName, lastName, phone } = user;
    const tran_id = crypto.randomBytes(8).toString("hex");
    

    const newPayment = new Payment({
      email,
      currency,
      membership,
      amount,
      tran_id,
    });

    await newPayment.save();
    

    const data = {
      tran_id: tran_id,
      total_amount: amount,
      currency: currency.toUpperCase(),
      success_url: `${baseUrl}/renew-membership?payment=successful`,
      fail_url: `${baseUrl}/renew-membership?payment=failed`,
      cancel_url: `${baseUrl}/renew-membership/register`,
      ipn_url: `${baseUrl}/api/members/renew/success`,
      cus_name: `${firstName} ${lastName}`,
      cus_email: email,
      cus_phone: phone,
      shipping_method: 'NO',
      product_name: "Membership",
      product_category: membership,
      product_profile: 'non-physical-goods',
    };
   
    let url;
    const sslcommer = new SSLCommerzPayment(storeID, storePassword, false); 
    await sslcommer.init(data).then((data) => {
      console.log('ssl', data)
    if (data?.GatewayPageURL) {
      url = data?.GatewayPageURL
    } 
   
  });
  
    res.status(200).json({url})
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
