import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { DashboardOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import { getCurrentUser } from "../contexts/auth";

const { Sider, Content, Header } = Layout;

const DashboardPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch user details (simulate API call)
  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      navigate("/login");
      return;
    }
    setUserRole(user.role);
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/login"); 
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            My Profile
          </Menu.Item>
          <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main Content */}
      <Layout>
        <Header style={{ backgroundColor: "#001529", color: "#fff", textAlign: "center" }}>
          {userRole === "admin" ? "Admin Dashboard" : "User Dashboard"}
        </Header>
        <Content style={{ padding: "24px" }}>
          {userRole === "admin" ? <AdminDashboard /> : <UserDashboard />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;
