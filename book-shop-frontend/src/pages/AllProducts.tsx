import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Select, Typography, Button, Rate, Input, Spin, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from 'axios';

const { Title, Text } = Typography;
const { Option } = Select;

interface Product {
  _id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  rating: number;
}

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch products from the backend API
    axios.get('http://localhost:5000/products')
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
        setError('There was an error fetching the products.');
        setLoading(false);
        message.error('Failed to load products. Please try again.');
      });
  }, []);

  const handleSortChange = (value: string) => {
    let sortedProducts = [...filteredProducts];

    if (value === "price-low-high") sortedProducts.sort((a, b) => a.price - b.price);
    if (value === "price-high-low") sortedProducts.sort((a, b) => b.price - a.price);
    if (value === "rating") sortedProducts.sort((a, b) => b.rating - a.rating);

    setFilteredProducts(sortedProducts);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Loading products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', fontSize: '18px', color: '#ac1352' }}>
        {error}
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <Title level={2} style={{ textAlign: "center", color: "#ac1352", fontWeight: "bold" }}>All Products</Title>

        {/* Search Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <Input
            placeholder="Search by title, category, or author"
            value={searchTerm}
            onChange={handleSearch}
            style={{ width: "300px", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
            allowClear
            bordered={true}
          />

          {/* Sorting Dropdown */}
          <Select
            placeholder="Sort by"
            onChange={handleSortChange}
            style={{ width: 200 }}
            bordered={false}
            dropdownStyle={{ backgroundColor: "#fff" }}
          >
            <Option value="price-low-high">Price: Low to High</Option>
            <Option value="price-high-low">Price: High to Low</Option>
            <Option value="rating">Rating</Option>
          </Select>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', fontSize: '18px', color: '#ac1352' }}>
            No products found matching your search criteria.
          </div>
        ) : (
          <Row gutter={[16, 16]}>
            {filteredProducts.map((product) => (
              <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={
                    <div style={{ position: "relative" }}>
                      <img
                        alt={product.title} 
                        src={product.image}
                        style={{
                          width: "100%",
                          height: "180px",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                          backgroundColor: "#ac1352",
                          color: "#fff",
                          padding: "4px 8px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "bold"
                        }}
                      >
                        {product.category}
                      </span>
                    </div>
                  }
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    border: "none",
                    backgroundColor: "#f9f9f9",
                    height: "100%" 
                  }}
                  bodyStyle={{
                    padding: "10px",
                    textAlign: "center",
                    backgroundColor: "#fff",
                    borderBottomLeftRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                    e.currentTarget.style.boxShadow = "0px 12px 20px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0px 6px 15px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <Title level={5} style={{ fontWeight: "bold", marginBottom: "8px", marginTop:'-5px', 
                    fontSize: "16px" }}>
                    {product.title}
                  </Title>
                  <Row gutter={[8, 8]} justify="space-between" align="middle">
                    <Col>
                      <Text style={{ fontSize: "14px", fontWeight: "bold", color: "#ac1352" }}>${product.price.toFixed(2)}</Text>
                    </Col>
                    <Col>
                      <Rate disabled defaultValue={product.rating} style={{ color: "#d4af37", fontSize: "12px" }} />
                    </Col>
                  </Row>
                  <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    style={{
                      backgroundColor: "#ac1352",
                      borderColor: "#ac1352",
                      width: "100%",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      transition: "background 0.3s ease",
                      marginTop: "10px",
                      padding: "6px",
                    }}
                  >
                    <Link to={`/products/${product._id}`} style={{ color: "#fff" }}>More Details</Link>
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AllProducts;