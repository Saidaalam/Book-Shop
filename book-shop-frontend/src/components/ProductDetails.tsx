import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Typography, Rate, Spin, message } from 'antd';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from '../contexts/CartContext';

const { Title, Text } = Typography;

interface Product {
  _id: string; 
  title: string;
  author: string;
  image: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  available: boolean;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const { addToCart } = useCart(); // Use cart context
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/products/${id}`) 
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError('Error fetching product details.');
        message.error('Something went wrong. Please try again later.');
        console.error("Error fetching product details", error);
      });
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', paddingTop: '20px' }}><Spin size="large" /></div>;
  if (error) return <div style={{ textAlign: 'center', fontSize: '18px', color: '#ac1352' }}>{error}</div>;
  if (!product) return null;

  // Add to cart function
  const handleAddToCart = () => {
    console.log("Adding to cart:", product);
  
    if (!product) {
      console.error("No product found!");
      return;
    }
  
    addToCart({
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  
    console.log("Product added to cart!");
  };
  

  return (
    <div style={{ backgroundColor: '#f7f7f7', padding: '40px 0' }}>
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <img 
              src={product.image} 
              alt={product.title} 
              style={{
                width: "100%",
                maxWidth: "300px", 
                borderRadius: "10px", 
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", 
                objectFit: 'cover', 
                margin: "0 auto",
                display: "block",  
              }} 
            />
          </Col>
          <Col xs={24} sm={12}>
            <Card 
              style={{
                padding: "20px", 
                borderRadius: "10px", 
                boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)", 
                backgroundColor: "#fff",
              }}
              hoverable
            >
              <Title level={2} style={{ color: '#333' }}>{product.title}</Title>
              <Text style={{ fontSize: "16px", fontWeight: "bold", color: "#555" }}>By {product.author}</Text>
              <div style={{ marginTop: "10px" }}>
                <Text style={{ fontSize: "20px", color: "#ac1352", fontWeight: "bold" }}>${product.price.toFixed(2)}</Text>
              </div>
              <div style={{ marginTop: "10px" }}>
                <Rate disabled defaultValue={product.rating} style={{ color: "#ac1352" }} />
              </div>
              <div style={{ marginTop: "20px", fontSize: '16px', color: '#555' }}>
                <Text>{product.description}</Text>
              </div>
              <div style={{ marginTop: "20px" }}>
                <Button
                  type="primary"
                  onClick={handleAddToCart}
                  style={{
                    backgroundColor: "#ac1352",
                    borderColor: "#ac1352",
                    width: "100%",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    marginTop: "20px",
                    transition: "all 0.3s ease",
                  }}
                >
                  Add to cart
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
