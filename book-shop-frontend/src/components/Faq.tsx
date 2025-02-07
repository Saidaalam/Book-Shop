import React, { useState } from "react";
import { Card, Row, Col, Typography, Collapse } from "antd";

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Simply browse our collection, choose the books you like, and click 'Buy Now'. You can then proceed to checkout and complete your order.",
  },
  {
    question: "What are your delivery charges?",
    answer:
      "Delivery charges vary based on your location. You will be able to see the delivery charges at the checkout page before you confirm your order.",
  },
  {
    question: "Do you offer gift wrapping?",
    answer:
      "Yes, we offer gift wrapping for a small fee. You can select the gift wrap option during the checkout process.",
  },
  {
    question: "Can I return a book?",
    answer:
      "Yes, you can return a book within 30 days of purchase if it's in its original condition. Please refer to our return policy for more details.",
  },
  {
    question: "Do you have any discounts for bulk orders?",
    answer:
      "Yes, we offer discounts for bulk orders. Please contact our customer service team for more information on bulk discounts.",
  },
];

const FAQ: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string[]>([]);

  const handleChange = (key: string | string[]) => {
    setActiveKey(Array.isArray(key) ? key : [key]);
  };

  return (
    <div style={{ padding: "40px 20px", background: "#f9f9f9" }}>
      <Title level={2} style={{ textAlign: "center", color: "#ac1352" }}>
        Frequently Asked Questions
      </Title>
      <Row justify="center">
        <Col xs={24} sm={20} md={16}>
          <Card style={{ borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
            <Collapse
              activeKey={activeKey}
              onChange={handleChange}
              accordion
              expandIconPosition="start"
            >
              {faqs.map((faq, index) => (
                <Panel header={faq.question} key={index}>
                  <Paragraph>{faq.answer}</Paragraph>
                </Panel>
              ))}
            </Collapse>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FAQ;