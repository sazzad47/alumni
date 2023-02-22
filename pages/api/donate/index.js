import crypto from "crypto";
import * as SSLCommerzPayment from "sslcommerz-lts";

const storeID = process.env.SSL_STORE_ID;
const storePassword = process.env.SSL_STORE_PASSWORD;
const baseUrl = process.env.BASE_URL;

import Donation from "../../../models/donate";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await initPayment(req, res);
      break;
  }
};

const initPayment = async (req, res) => {
  try {
    const { firstName, lastName, phone, email, currency, amount } = req.body;
    const tran_id = crypto.randomBytes(8).toString("hex");
    
    const newDonation = new Donation({
      tran_id,
      email,
      phone,
      amount,
      currency,
    });
    
    await newDonation.save();
    
    const data = {
      tran_id: tran_id,
      total_amount: Number(amount),
      currency: currency.toUpperCase(),
      success_url: `${baseUrl}/donate?donation=successful`,
      // success_url: `${baseUrl}/api/donate/success`,
      fail_url: `${baseUrl}/donate?donation=failed`,
      cancel_url: `${baseUrl}/donate`,
      ipn_url: `${baseUrl}/api/donate/success`,
      cus_name: `${firstName} ${lastName}`,
      cus_email: email,
      cus_phone: phone,
      shipping_method: 'NO',
      product_name: "Donation",
      product_category: "Donation",
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
