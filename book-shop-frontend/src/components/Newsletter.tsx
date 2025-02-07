import React, { useState } from "react";
import { Input, Button, Typography, message } from "antd";
import { MailOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      message.error("Please enter a valid email address!");
      return;
    }
    message.success("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <div style={{ padding: "40px 20px", textAlign: "center", background: "#ac1352", color: "#fff" }}>
      <Title level={2} style={{ color: "#fff" }}>Subscribe to Our Newsletter</Title>
      <Text style={{ fontSize: "16px", color: "#f3f3f3" }}>
        Stay updated with our latest book collections and exclusive offers.
      </Text>
      <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: "10px" }}>
        <Input
          placeholder="Enter your email"
          prefix={<MailOutlined />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: 300, borderRadius: "5px" }}
        />
        <Button type="primary" onClick={handleSubscribe} style={{ background: "#fff", color: "#ac1352" }}>
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default Newsletter;
