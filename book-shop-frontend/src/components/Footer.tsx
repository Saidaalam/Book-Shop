import React from "react";
import { Layout, Row, Col, Button, Input, Space, Typography } from "antd";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Footer: React.FC = () => {
  return (
    <Layout.Footer
      style={{
        backgroundColor: "#ffffff", 
        padding: "10px 30px",
        color: "#ac1352",
        textAlign: "center",
      }}
    >
      <Row gutter={[32, 32]}>
        {/* Column 1: Logo and Tagline */}
        <Col xs={24} sm={8} md={6}>
          <Title level={3} style={{ color: "#ac1352", marginBottom: "10px",  marginTop:"60px" }}>
         Book Shop
          </Title>
          <p style={{ color: "#7f8c8d" }}>
            "one-stop shop for all favorite books!"
          </p>
        </Col>

        {/* Column 2: Menu or Additional Pages */}
        <Col xs={24} sm={8} md={6}>
          <Title level={4} style={{ color: "#ac1352" }}>Quick Links</Title>
          <ul style={{ listStyleType: "none", padding: 0, color: "#7f8c8d" }}>
            <li><Button type="link" href="/home" style={{ color: "#7f8c8d" }}>Home</Button></li>
            <li><Button type="link" href="/products" style={{ color: "#7f8c8d" }}>Products</Button></li>
            <li><Button type="link" href="/about" style={{ color: "#7f8c8d" }}>About Us</Button></li>
            <li><Button type="link" href="/contact" style={{ color: "#7f8c8d" }}>Contact</Button></li>
          </ul>
        </Col>

        {/* Column 3: Newsletter */}
        <Col xs={24} sm={8} md={6}>
          <Title level={4} style={{ color: "#ac1352" }}>Newsletter</Title>
          <p style={{ color: "#7f8c8d" }}>Subscribe our newsletter to get updates!</p>
          <Input
            placeholder="Enter your email"
            style={{
              marginBottom: "10px",
              width: "80%",
              borderRadius: "4px",
              border: "1px solid #ac1352",
            }}
          />
          <Button
            type="primary"
            style={{
              backgroundColor: "#ac1352", 
              borderColor: "#ac1352",
              fontSize: "15px",
              color: "#ffffff", 
            }}
          >
            Subscribe
          </Button>
        </Col>

        {/* Column 4: Social Media and Payment */} 
        <Col xs={24} sm={8} md={6}>
          <Title level={4} style={{ color: "#ac1352", marginTop:"50px"}}>Follow Us</Title>
          <Space size="large" direction="horizontal">
            <Button
              icon={<FacebookOutlined />}
              type="link"
              style={{ fontSize: "20px", color: "#ac1352" }}
            />
            <Button
              icon={<TwitterOutlined />}
              type="link"
              style={{ fontSize: "20px", color: "#ac1352" }}
            />
            <Button
              icon={<InstagramOutlined />}
              type="link"
              style={{ fontSize: "20px", color: "#ac1352" }}
            />
            <Button
              icon={<LinkedinOutlined />}
              type="link"
              style={{ fontSize: "20px", color: "#ac1352" }}
            />
          </Space>
        </Col>
      </Row>

      <div style={{ marginTop: "20px", color: "#7f8c8d" }}>
        <p>© {new Date().getFullYear()} Book Shop. All Rights Reserved.</p>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
