import React, { useState, useEffect } from "react";
import { Form, Input, Button, Steps, Card, Typography, Divider, Spin } from "antd";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const { Title, Text } = Typography;
const { Step } = Steps;

const CheckoutPage: React.FC = () => {

  const [currentStep, setCurrentStep] = useState(0);
  const [isPaying] = useState(false);
  const [orderDetails, setOrderDetails] = useState({ name: "", email: "", address: "", quantity: 1 });
  const [totalPrice, setTotalPrice] = useState(0);
  const productPrice = 49.99; 

  useEffect(() => {
    setTotalPrice(orderDetails.quantity * productPrice);
  }, [orderDetails.quantity]);

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handlePrev = () => setCurrentStep((prev) => prev - 1);

  const handlePayment = () => {
    window.location.href = "https://sandbox.shurjopayment.com";
  };  

  return (
    <div>
      <Navbar />
      <div style={{ padding: "10px 16px", backgroundColor: "#f5f5f5" }}>
        <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>Checkout</Title>

        <Steps current={currentStep} style={{ maxWidth: 600, margin: "0 auto 20px" }}>
          <Step title="Billing Details" />
          <Step title="Order Summary" />
          <Step title="Payment" />
          <Step title="Confirm Order" />
        </Steps>

        <Card style={{ maxWidth: 600, margin: "0 auto", padding: 24, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
          {currentStep === 0 && (
            <Form layout="vertical">
              <Form.Item label="Full Name" rules={[{ required: true, message: "Enter your name!" }]}>
                <Input placeholder="John Doe" onChange={(e) => setOrderDetails({ ...orderDetails, name: e.target.value })} />
              </Form.Item>
              <Form.Item label="Email" rules={[{ required: true, type: "email", message: "Enter a valid email!" }]}>
                <Input placeholder="john@example.com" onChange={(e) => setOrderDetails({ ...orderDetails, email: e.target.value })} />
              </Form.Item>
              <Form.Item label="Address" rules={[{ required: true, message: "Enter your address!" }]}>
                <Input.TextArea placeholder="123 Main St, City, Country" onChange={(e) => setOrderDetails({ ...orderDetails, address: e.target.value })} />
              </Form.Item>
              <Button type="primary" block onClick={handleNext} style={{ backgroundColor: "#ac1352", borderColor: "#ac1352", color: "#fff" }}>
                Continue to Summary
              </Button>
            </Form>
          )}

          {currentStep === 1 && (
            <>
              <Title level={4}>Order Summary</Title>
              <Text>Product A - ${productPrice}</Text>
              <br />
              <Divider />
              <Text strong>Total: ${totalPrice.toFixed(2)}</Text>
              <Divider />
              <Button onClick={handlePrev} style={{ marginRight: 8, backgroundColor: "#ac1352", borderColor: "#ac1352", color: "#fff" }}>
                Back
              </Button>
              <Button type="primary" onClick={handleNext} style={{ backgroundColor: "#ac1352", borderColor: "#ac1352", color: "#fff" }}>
                Proceed to Payment
              </Button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <Title level={4}>Payment Details</Title>
              <Form layout="vertical">
                <Form.Item label="Card Number" rules={[{ required: true, message: "Enter your card number!" }]}>
                  <Input placeholder="1234 5678 9012 3456" />
                </Form.Item>
                <Form.Item label="Expiration Date" rules={[{ required: true, message: "Enter expiration date!" }]}>
                  <Input placeholder="MM/YY" />
                </Form.Item>
                <Form.Item label="CVV" rules={[{ required: true, message: "Enter CVV!" }]}>
                  <Input placeholder="123" />
                </Form.Item>
                <Button type="primary" block onClick={handlePayment} style={{ backgroundColor: "#ac1352", borderColor: "#ac1352", color: "#fff" }}>
                  Pay Now
                </Button>
              </Form>
            </>
          )}

          {currentStep === 3 && (
            <div style={{ textAlign: "center", padding: "20px" }}>
              {isPaying ? (
                <>
                  <Spin size="large" />
                  <Text style={{ display: "block", marginTop: 10 }}>Processing payment...</Text>
                </>
              ) : (
                <>
                  <Title level={4}>Payment Successful!</Title>
                  <Text>Your payment has been processed. Click below to confirm your order.</Text>
                  <Divider />
                </>
              )}
            </div>
          )}
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
