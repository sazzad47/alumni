import crypto from "crypto";
import * as SSLCommerzPayment from "sslcommerz-lts";

const storeID = process.env.SSL_STORE_ID;
const storePassword = process.env.SSL_STORE_PASSWORD;
const baseUrl = process.env.BASE_URL;

import connectDB from "../../../utils/connectDB";
import Users from "../../../models/userModel";
import Payment from "../../../models/payment";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await initPayment(req, res);
      break;
  }
};

const initPayment = async (req, res) => {
  try {
    const { firstName, lastName, ssc_batch, phone, email, membership, currency, amount } = req.body;
    const tran_id = crypto.randomBytes(8).toString("hex");
    
    const newUser = new Users({
      firstName,
      lastName,
      ssc_batch,
      phone,
      email,
    });

    const newPayment = new Payment({
      email,
      currency,
      membership,
      amount,
      tran_id,
    });

    let user = await Users.findOne({ email });
    if ( !user) {
      await newUser.save();
      await newPayment.save();
    } else {
      await newPayment.save();
    }
    
    

    const data = {
      tran_id: tran_id,
      total_amount: amount,
      currency: currency.toUpperCase(),
      success_url: `${baseUrl}/members/register?payment=successful`,
      // success_url: `${baseUrl}/api/payment/success`,
      fail_url: `${baseUrl}/members/register?payment=failed`,
      cancel_url: `${baseUrl}/members/register`,
      ipn_url: `${baseUrl}/api/payment/success`,
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
    if (data?.GatewayPageURL) {
      url = data?.GatewayPageURL
    } 
   
  });
  
    res.status(200).json({url})
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
