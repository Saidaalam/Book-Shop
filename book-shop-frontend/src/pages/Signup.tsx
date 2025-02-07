import React, { useState } from 'react';
import { Input, Button, Form, Card, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios, { AxiosError } from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    setLoading(true);

    // Check if passwords match
    if (password !== confirmPassword) {
      message.error('Passwords do not match!');
      setLoading(false);
      return;
    }

    // Check if fields are empty
    if (!name || !email || !password) {
      message.error('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      // Call your API for signup
      const response = await axios.post('http://localhost:5000/auth/register', {
        name,
        email,
        password,
      });

      if (response.data && response.data.message) {
        message.success('Signup successful! Please login.', 3); 
        navigate('/login');  
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          message.error(error.response.data.message || 'Something went wrong');
        } else {
          message.error('Server error');
        }
      } else {
        message.error('An unexpected error occurred');
      }
    }

    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5', padding: "20px" }}>
        <Card style={{ width: 400, padding: '20px' }} title="Sign Up" bordered={false}>
          <Form onFinish={handleSignup}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                prefix={<UserOutlined />}
                placeholder="Full Name"
                style={{ borderColor: "#ac1352" }}
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                prefix={<MailOutlined />}
                placeholder="Email"
                style={{ borderColor: "#ac1352" }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                prefix={<LockOutlined />}
                placeholder="Password"
                style={{ borderColor: "#ac1352" }}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: 'Please confirm your password!' }]}
            >
              <Input.Password
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
                style={{ borderColor: "#ac1352" }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                style={{ backgroundColor: "#ac1352" }}
                type="primary"
                htmlType="submit"
                block
                loading={loading}
              >
                Sign Up
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="link"
                onClick={() => navigate('/login')}
                style={{ width: '100%', textAlign: 'center', backgroundColor: "#ac1352", color: "white" }}
              >
                Already have an account? Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;