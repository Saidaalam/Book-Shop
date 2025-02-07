import React from "react";
import { Row, Col, Card, Typography, Button, Divider } from "antd";
import { TeamOutlined, TrophyOutlined, HeartOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const { Title, Paragraph } = Typography;

const AboutUs: React.FC = () => {
  return (
   <div>
    <Navbar/>
     <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5", padding: "30px 16px" }}>
      {/* Header Section */}
      <Row justify="center">
        <Col xs={24} md={16} lg={12}>
          <Title level={1} style={{ textAlign: "center", fontWeight: "bold", marginBottom: "16px" }}>
            About Us
          </Title>
          <Paragraph style={{ textAlign: "center", fontSize: "16px", color: "#595959" }}>
            We are committed to delivering high-quality services and innovative solutions. Our team is dedicated to making a positive impact and pushing the boundaries of excellence.
          </Paragraph>
        </Col>
      </Row>

      {/* Info Cards Section */}
      <Row gutter={[24, 24]} justify="center" style={{ marginTop: "40px" }}>
        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} style={{ textAlign: "center", padding: "20px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            <TeamOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
            <Title level={3} style={{ marginTop: "12px" }}>Our Team</Title>
            <Paragraph>
              A passionate team of experts working together to create something meaningful.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} style={{ textAlign: "center", padding: "20px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            <TrophyOutlined style={{ fontSize: "48px", color: "#faad14" }} />
            <Title level={3} style={{ marginTop: "12px" }}>Our Mission</Title>
            <Paragraph>
              To innovate, inspire, and lead the industry with creativity and expertise.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card bordered={false} style={{ textAlign: "center", padding: "20px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
            <HeartOutlined style={{ fontSize: "48px", color: "#ff4d4f" }} />
            <Title level={3} style={{ marginTop: "12px" }}>Our Values</Title>
            <Paragraph>
              Integrity, innovation, and commitment to our clients and partners.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      {/* Call to Action Section */}
      <Divider style={{ marginTop: "60px" }} />
      <Row justify="center">
        <Col xs={24} md={16} lg={12} style={{ textAlign: "center" }}>
          <Title level={2}>Join Us on Our Journey</Title>
          <Paragraph>
            We believe in making a difference. Whether you're a customer, a partner, or a future team member, we'd love to connect with you.
          </Paragraph>
          <Button type="primary" size="large" style={{backgroundColor: "#ac1352"}}>
            Contact Us
          </Button>
        </Col>
      </Row>
    </div>
    <Footer />
   </div>
  );
};

export default AboutUs;
