import React from "react";
import { Layout, Menu, Avatar, Button, Breadcrumb, Card } from "antd";
import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ManageUsers from "../components/ManageUsers";
import ManageProducts from "../components/ManageProducts";
import ManageOrders from "../components/ManageOrders";

const { Header, Content, Sider } = Layout;

const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Function to generate breadcrumb dynamically
  const getBreadcrumb = () => {
    const path = location.pathname.split("/").filter(Boolean);
    return path.map((item, index) => (
      <Breadcrumb.Item key={index}>
        {item.charAt(0).toUpperCase() + item.slice(1)}
      </Breadcrumb.Item>
    ));
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        width={250}
        style={{
          background: "#001529",
          color: "#fff",
          paddingTop: "20px",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <Avatar size={64} icon={<UserOutlined />} />
          <h2 style={{ color: "#fff", marginTop: "10px" }}>Admin Panel</h2>
        </div>

        <Menu theme="dark" mode="vertical" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/admin-dashboard/users">Manage Users</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<AppstoreOutlined />}>
            <Link to="/admin-dashboard/products">Manage Products</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ShoppingCartOutlined />}>
            <Link to="/admin-dashboard/orders">Manage Orders</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />} danger>
            <Button
              type="link"
              style={{ color: "#ff4d4f" }}
              onClick={() => navigate("/login")}
            >
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        {/* Header */}
        <Header
          style={{
            background: "#f0f2f5",
            padding: "10px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>Admin Dashboard</h2>
        </Header>

        {/* Breadcrumb Navigation */}
        <div style={{ padding: "10px 20px" }}>
          <Breadcrumb>{getBreadcrumb()}</Breadcrumb>
        </div>

        {/* Main Content */}
        <Content style={{ padding: "20px", background: "#f0f2f5", minHeight: "100vh" }}>
          <Card style={{ boxShadow: "0 4px 10px rgba(0,0,0,0.1)", borderRadius: "10px" }}>
            <Routes>
              <Route path="users" element={<ManageUsers />} />
              <Route path="products" element={<ManageProducts />} />
              <Route path="orders" element={<ManageOrders />} />
              <Route path="/" element={<h2>Welcome to the Admin Dashboard</h2>} />
            </Routes>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
