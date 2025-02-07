import React, { useState } from "react";
import { Input, Button, Form, Card, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError("");
  
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";
  
    if (values.email === adminEmail && values.password === adminPassword) {
      localStorage.setItem("token", "admin_token");
      localStorage.setItem("role", "admin");
      console.log("Admin Login successful!");
      message.success("Admin Login successful!", 2);
      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 2000);
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        values,
        { withCredentials: true }
      );
  
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role); 
  
      message.success("Login successful!", 2);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error("Login error:", err.response?.data?.message);
        setError(err.response?.data?.message || "Login failed");
        message.error(err.response?.data?.message || "Login failed");
      } else {
        console.error("Unexpected error:", err);
        setError("Unexpected error occurred");
        message.error("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f2f5",
        }}
      >
        <Card style={{ width: 400, padding: "20px" }} title="Login" bordered={false}>
          <Form onFinish={handleLogin}>
            <Form.Item name="email" rules={[{ required: true, message: "Please input your email!" }]}>
              <Input prefix={<UserOutlined />} placeholder="Email" style={{ borderColor: "#ac1352" }} />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Password" style={{ borderColor: "#ac1352" }} />
            </Form.Item>

            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

            <Form.Item>
              <Button style={{ backgroundColor: "#ac1352" }} type="primary" htmlType="submit" block loading={loading}>
                Login
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                type="link"
                onClick={() => navigate("/signup")}
                block
                style={{
                  backgroundColor: "#ac1352",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Create an account
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Login;