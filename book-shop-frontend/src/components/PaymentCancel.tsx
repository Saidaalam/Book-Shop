import React from "react";
import { useNavigate } from "react-router-dom";
import { message, Button } from "antd";

const PaymentCancel: React.FC = () => {
  const navigate = useNavigate();

  message.error("Payment Cancelled!");

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h2>Payment Cancelled!</h2>
      <p>Your payment has been canceled. Try again later.</p>
      <Button type="primary" onClick={() => navigate("/")}>Go to Home</Button>
    </div>
  );
};

export default PaymentCancel;
