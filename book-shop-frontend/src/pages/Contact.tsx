import React, { useState } from "react";
import { Button, Input, Form, message, Card, Row, Col, Typography, Space } from "antd";
import { MailOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const { Title, Paragraph, Link } = Typography;

const Contact: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      message.success("Your message has been sent successfully!");
      form.resetFields();
      setLoading(false);
    }, 1500);
  };

  return (

   <div>
     <Navbar/>
    <Row justify="center" style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", padding: "40px 16px" }}>
      <Col xs={24} sm={20} md={16} lg={12}>
        <Card bordered={false} style={{ padding: "24px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
          <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
            Get in Touch
          </Title>

          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Your Name" name="name" rules={[{ required: true, message: "Please enter your name!" }]}>
                  <Input placeholder="Enter your name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="email" rules={[{ required: true, type: "email", message: "Please enter a valid email!" }]}>
                  <Input placeholder="Enter your email" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Message" name="message" rules={[{ required: true, message: "Please enter your message!" }]}>
              <Input.TextArea placeholder="Write your message" rows={4} />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading} block
            style={{backgroundColor: "#ac1352"}}
            >
              Send Message
            </Button>
          </Form>

          <div style={{ marginTop: "32px", textAlign: "center", color: "#ac1352" }}>
            <Title level={4}>Or reach us at:</Title>
            <Space direction="vertical" size="middle">
              <Paragraph>
                <MailOutlined style={{ color: "#ac1352" }} />{" "}
                <Link href="mailto:info@example.com"  style={{color: "#ac1352"}}>info@example.com</Link>
              </Paragraph>
            </Space>
          </div>
        </Card>
      </Col>
    </Row>
    <Footer />
   </div>
  );
};

export default Contact;
