import React from "react";
import { useNavigate } from "react-router-dom";
import { message, Button } from "antd";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  message.success("Payment Successful!");

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Payment Successful!</h2>
      <p>Thank you for your purchase.</p>
      <Button type="primary" onClick={() => navigate("/")}>Go to Home</Button>
    </div>
  );
};

export default PaymentSuccess;
