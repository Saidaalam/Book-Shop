import React, { useEffect, useState } from "react";
import { Layout, Menu, Card, Button, Table, Statistic, Row, Col, message, Typography, Form, Input } from "antd";
import { UserOutlined, LogoutOutlined, ShoppingCartOutlined, DollarCircleOutlined, LockOutlined, EditOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Sider, Content } = Layout;

const UserDashboard: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const walletBalance = 1000;
  const [totalOrders, setTotalOrders] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState("orders");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ name: "John Doe", email: "john.doe@example.com" });

  const mockOrders = [
    { _id: "order1", status: "Completed", amount: 150.75 },
    { _id: "order2", status: "Pending", amount: 220.50 },
    { _id: "order3", status: "Canceled", amount: 80.99 },
  ];

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Use mock data for now
        setOrders(mockOrders);
        setTotalOrders(mockOrders.length);
      } catch (error) {
        message.error("Failed to fetch orders!");
      }
    };

    fetchOrders();
  });

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success("Logged out successfully!");
    window.location.href = "/login";
  };

  // Update Profile Function
  const handleUpdateProfile = async (values: { name: string; email: string }) => {
    try {
      setUser(values); 
      message.success("Profile updated successfully!");
    } catch (error) {
      message.error("Failed to update profile!");
    }
  };

  // Update Password Function
  const handleUpdatePassword = async (values: { currentPassword: string; newPassword: string }) => {
    setLoading(true);
    try {
      message.success("Password updated successfully!");
    } catch (error) {
      message.error("Failed to update password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider width={250} theme="light">
        <div className="p-4 text-center">
          <Title level={3}>User Dashboard</Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedMenu]}
          onClick={(e) => setSelectedMenu(e.key)}
          items={[
            { key: "orders", icon: <ShoppingCartOutlined />, label: "My Orders" },
            { key: "profile", icon: <UserOutlined />, label: "Profile Settings" },
            { key: "logout", icon: <LogoutOutlined />, label: "Logout", onClick: handleLogout },
          ]}
        />
      </Sider>

      {/* Main Content */}
      <Layout>
        <Content style={{ padding: "20px" }}>
          {/* Wallet & Order Stats */}
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={12} md={8}>
              <Card bordered={false}>
                <Statistic
                  title="Wallet Balance"
                  value={`$${walletBalance}`}
                  prefix={<DollarCircleOutlined style={{ color: "#52c41a" }} />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card bordered={false}>
                <Statistic
                  title="Total Orders"
                  value={totalOrders}
                  prefix={<ShoppingCartOutlined style={{ color: "#1890ff" }} />}
                />
              </Card>
            </Col>
          </Row>

          {/* Toggle Between Orders & Profile */}
          {selectedMenu === "orders" ? <OrdersComponent orders={orders} /> : <ProfileComponent user={user} handleUpdateProfile={handleUpdateProfile} handleUpdatePassword={handleUpdatePassword} loading={loading} />}
        </Content>
      </Layout>
    </Layout>
  );
};

/* Orders Component */
const OrdersComponent: React.FC<{ orders: any[] }> = ({ orders }) => (
  <Card title="My Orders" style={{ marginTop: 20 }} bordered={false}>
    <Table dataSource={orders} columns={[
      { title: "Order ID", dataIndex: "_id", key: "_id" },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: string) => {
          let color = status === "Completed" ? "green" : status === "Pending" ? "gold" : "red";
          return <Text style={{ color }}>{status}</Text>;
        },
      },
      { title: "Amount", dataIndex: "amount", key: "amount", render: (amount: number) => `$${amount.toFixed(2)}` },
    ]} rowKey="_id" pagination={{ pageSize: 5 }} />
  </Card>
);

/* Profile Component */
const ProfileComponent: React.FC<{ user: any; handleUpdateProfile: any; handleUpdatePassword: any; loading: boolean }> = ({ user, handleUpdateProfile, handleUpdatePassword, loading }) => (
  <Card title="Profile Settings" style={{ marginTop: 20 }} bordered={false}>
    <Card title="Edit Profile">
      <Form layout="vertical" initialValues={user} onFinish={handleUpdateProfile}>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name" }]} >
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email" }]} >
          <Input prefix={<UserOutlined />} type="email" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<EditOutlined />} block>
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </Card>

    <Card title="Update Password" style={{ marginTop: 20 }}>
      <Form layout="vertical" onFinish={handleUpdatePassword}>
        <Form.Item label="Current Password" name="currentPassword" rules={[{ required: true, message: "Please enter your current password" }]}>
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item label="New Password" name="newPassword" rules={[{ required: true, message: "Please enter your new password" }]}>
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </Card>
  </Card>
);

export default UserDashboard;
