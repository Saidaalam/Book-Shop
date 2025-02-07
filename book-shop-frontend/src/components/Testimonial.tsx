import React from "react";
import { Carousel, Card, Avatar, Typography, Rate } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const testimonials = [
  {
    name: "Alice Johnson",
    review: "Fantastic book collection and great service! Highly recommended.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5, // Rating for Alice
  },
  {
    name: "Mark Peterson",
    review: "Fast delivery and amazing discounts. Will buy again!",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    rating: 4, // Rating for Mark
  },
  {
    name: "Sophia Lee",
    review: "Loved the variety of books. The website is very user-friendly.",
    avatar: "https://randomuser.me/api/portraits/women/50.jpg",
    rating: 4.5, // Rating for Sophia
  },
];

const Testimonial: React.FC = () => {
  return (
    <div style={{ padding: "40px 20px", textAlign: "center", background: "#f9f9f9" }}>
      <Title level={2} style={{ color: "#ac1352" }}>What Our Customers Say</Title>
      <Carousel autoplay dots={{ className: "custom-carousel-dots" }} effect="scrollx" slidesToShow={2} slidesToScroll={1}>
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            style={{ maxWidth: 500, margin: "20px auto", textAlign: "center", borderRadius: "10px" }}
          >
            <Avatar src={testimonial.avatar} size={80} icon={<UserOutlined />} />
            <Title level={4} style={{ marginTop: 10 }}>{testimonial.name}</Title>
            <Rate disabled value={testimonial.rating} style={{ marginBottom: "10px" }} />
            <div>
              <Text italic style={{ fontSize: "16px", color: "#555", display: "block", marginTop: "10px" }}>
                "{testimonial.review}"
              </Text>
            </div>
          </Card>
        ))}
      </Carousel>
    </div>
  );
};

export default Testimonial;