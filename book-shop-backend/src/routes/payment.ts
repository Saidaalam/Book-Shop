import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const MERCHANT_USERNAME = process.env.SHURJOPAY_USERNAME;
const MERCHANT_PASSWORD = process.env.SHURJOPAY_PASSWORD;
const CLIENT_ID = process.env.SHURJOPAY_CLIENT_ID;
const CLIENT_SECRET = process.env.SHURJOPAY_CLIENT_SECRET;
const API_URL = "https://engine.shurjopayment.com/api/";

router.post("/pay", async (req, res) => {
  try {
    // Step 1: Get Authentication Token
    const authResponse = await axios.post(`${API_URL}get_token`, {
      username: MERCHANT_USERNAME,
      password: MERCHANT_PASSWORD,
    });

    const token = authResponse.data.token;

    // Step 2: Initialize Payment Request
    const { amount, order_id, customer_name, customer_email, customer_address } = req.body;

    const paymentData = {
      token,
      store_id: CLIENT_ID,
      amount,
      order_id,
      currency: "BDT",
      customer_name,
      customer_email,
      customer_address,
      return_url: "http://localhost:3000/payment-success",
      cancel_url: "http://localhost:3000/payment-cancel",
    };

    const paymentResponse = await axios.post(`${API_URL}payment_request`, paymentData);
    
    if (paymentResponse.data.checkout_url) {
      res.json({ success: true, url: paymentResponse.data.checkout_url });
    } else {
      res.status(500).json({ success: false, message: "Failed to generate payment URL" });
    }
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ success: false, message: "Payment failed" });
  }
});

export default router;
