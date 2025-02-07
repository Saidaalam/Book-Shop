import React, { useEffect, useState } from "react";
import { Button, Input, Card, Row, Col, Typography, notification, Space } from "antd";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const { Title, Text } = Typography;

interface CartItem {
  _id: string;
  name: string;
  totalPrice: number;
  quantity: number;
  image: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState("");
  const [total, setTotal] = useState(0);

  // Fetch cart items from database
  useEffect(() => {
    axios.get("http://localhost:5000/orders")
      .then((response) => {
        setCartItems(response.data);
        updateTotal(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  }, []);

  const updateTotal = (items: CartItem[]) => {
    const newTotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
    setTotal(newTotal);
  };  

  const handleQuantityChange = async (id: string, action: string) => {
    try {
      const updatedItems = cartItems.map((item) => {
        if (item._id === id) {
          const pricePerUnit = item.totalPrice / item.quantity; 
          if (action === "increase") {
            item.quantity += 1;
            item.totalPrice = pricePerUnit * item.quantity;
          } else if (action === "decrease" && item.quantity > 1) {
            item.quantity -= 1;
            item.totalPrice = pricePerUnit * item.quantity;
          }
        }
        return item;
      });
  
      // Update the database with the new quantity
      await axios.put(`http://localhost:5000/orders/${id}`, {
        quantity: updatedItems.find((item) => item._id === id)?.quantity,
        totalPrice: updatedItems.find((item) => item._id === id)?.totalPrice,
      });
  
      setCartItems([...updatedItems]); 
      updateTotal(updatedItems); 
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  

  // Handle item removal
  const handleItemRemove = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/orders/${id}`);
      const updatedItems = cartItems.filter((item) => item._id !== id);
      setCartItems(updatedItems);
      updateTotal(updatedItems);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Apply coupon
  const applyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setTotal(total - total * 0.1);
      notification.success({ message: "Coupon applied successfully!", duration: 2 });
    } else {
      notification.error({ message: "Invalid coupon code!", duration: 2 });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="cart-page mx-auto mt-12 px-5">
        <Row gutter={[24, 24]}>
          {/* Cart Items Section */}
          <Col xs={24} md={16}>
            {cartItems.length === 0 ? (
              <Title level={4}>Your cart is empty</Title>
            ) : (
              cartItems.map((item) => (
                <Card
                  key={item._id}
                  style={{ marginBottom: "16px", borderRadius: "10px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
                  actions={[
                    <Button
                      icon={<DeleteOutlined />}
                      onClick={() => handleItemRemove(item._id)}
                      style={{ color: "#ac1352", border: "none" }}
                    />,
                  ]}
                >
                  <Row gutter={[16, 16]}>
                  <Col span={8}>
  <img
    alt={item.name}
    src={item.image}
    style={{ width: "100%", maxWidth: "150px", maxHeight: "120px", objectFit: "contain" }}
  />
</Col>

                    <Col span={16}>
                      <Title level={4}>{item.name}</Title>
                      <Text>Price: ${item.totalPrice}</Text>
                      <div className="quantity-control mt-4">
                        <Button
                          icon={<MinusOutlined />}
                          shape="circle"
                          onClick={() => handleQuantityChange(item._id, "decrease")}
                          style={{ backgroundColor: "#ac1352", color: "white", border: "none", marginRight: "8px" }}
                        />
                        <Text className="mx-2">{item.quantity}</Text>
                        <Button
                          icon={<PlusOutlined />}
                          shape="circle"
                          onClick={() => handleQuantityChange(item._id, "increase")}
                          style={{ backgroundColor: "#ac1352", color: "white", border: "none", marginLeft: "8px" }}
                        />
                      </div>
                    </Col>
                  </Row>
                </Card>
              ))
            )}
          </Col>

          {/* Cart Summary Section */}
          <Col xs={24} md={8}>
            <Card
              style={{ padding: "20px", borderRadius: "10px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", backgroundColor: "#f8f8f8" }}
            >
              <Title level={4}>Summary</Title>
              <Row justify="space-between" style={{ marginBottom: "8px" }}>
                <Col span={12}>
                  <Text>Total</Text>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <Text>${total.toFixed(2)}</Text>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col span={16}>
                  <Input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    style={{ width: "100%", borderRadius: "8px", borderColor: "#ac1352", padding: "10px" }}
                  />
                </Col>
                <Col span={8}>
                  <Button type="primary" onClick={applyCoupon} style={{ width: "100%", backgroundColor: "#ac1352" }}>
                    Apply Coupon
                  </Button>
                </Col>
              </Row>

              <Space direction="vertical" style={{ marginTop: "20px", width: "100%" }}>
                <Link to="/checkout">
                  <Button type="primary" size="large" style={{ backgroundColor: "#ac1352", width: "100%" }}>
                    Checkout
                  </Button>
                </Link>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;