"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
const MERCHANT_USERNAME = process.env.SHURJOPAY_USERNAME;
const MERCHANT_PASSWORD = process.env.SHURJOPAY_PASSWORD;
const CLIENT_ID = process.env.SHURJOPAY_CLIENT_ID;
const CLIENT_SECRET = process.env.SHURJOPAY_CLIENT_SECRET;
const API_URL = "https://engine.shurjopayment.com/api/";
router.post("/pay", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Step 1: Get Authentication Token
        const authResponse = yield axios_1.default.post(`${API_URL}get_token`, {
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
        const paymentResponse = yield axios_1.default.post(`${API_URL}payment_request`, paymentData);
        if (paymentResponse.data.checkout_url) {
            res.json({ success: true, url: paymentResponse.data.checkout_url });
        }
        else {
            res.status(500).json({ success: false, message: "Failed to generate payment URL" });
        }
    }
    catch (error) {
        console.error("Payment Error:", error);
        res.status(500).json({ success: false, message: "Payment failed" });
    }
}));
exports.default = router;
