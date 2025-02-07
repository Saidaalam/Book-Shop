import React from "react";
import { Card, Row, Col, Typography, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const blogPosts = [
  {
    title: "Top 10 Must-Read Books in 2025",
    excerpt:
      "Here is a list of the top 10 must-read books for the year 2025, from fiction to non-fiction. These books are guaranteed to make your reading list more exciting.",
    author: "John Doe",
    date: "January 15, 2025",
    image: "https://i.postimg.cc/J7f850Nn/book.png",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg", 
  },
  {
    title: "How to Build a Reading Habit",
    excerpt:
      "Building a reading habit can be challenging, but it’s possible with the right mindset and strategies. In this post, we’ll show you how to develop a daily reading routine.",
    author: "Alice Smith",
    date: "January 10, 2025",
    image: "https://i.postimg.cc/TPVfK6Lw/habit.jpg", 
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    title: "Best Books for Self-Improvement",
    excerpt:
      "Self-improvement books can change the way we think and lead us to success. Here’s a collection of the best books to help you grow in various aspects of life.",
    author: "Sophia Lee",
    date: "January 5, 2025",
    image: "https://i.postimg.cc/NGndty45/book.webp",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const Blog: React.FC = () => {
  return (
    <div style={{ padding: "40px 20px", background: "#f9f9f9" }}>
      <Title level={2} style={{ textAlign: "center", color: "#ac1352" }}>
        Our Latest Blog Posts
      </Title>
      <Row gutter={[16, 16]} justify="center">
        {blogPosts.map((post, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card
              hoverable
              cover={
                <img
                  alt={post.title}
                  src={post.image}
                  style={{ height: "230px", objectFit: "cover", borderRadius: "10px" }} // Fixed height and object fit
                />
              }
              style={{
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Title level={4}>{post.title}</Title>
              <Row gutter={16} align="middle">
                <Col>
                  <Avatar src={post.avatar} icon={<UserOutlined />} />
                </Col>
                <Col>
                  <Typography.Text>{post.author}</Typography.Text>
                </Col>
                <Col>
                  <Typography.Text type="secondary">{post.date}</Typography.Text>
                </Col>
              </Row>
              <Paragraph>{post.excerpt}</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Blog;
