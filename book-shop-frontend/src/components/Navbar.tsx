import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Avatar, Button, Typography, Drawer } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, DownOutlined, MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update authentication status dynamically
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={"/user-dashboard"}>
    User Dashboard
        </Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const menuItems = ["Home", "About", "Products", "Cart", "Contact"].map((item, i) => ({
    key: `${i + 1}`,
    label: (
      <Link to={`/${item.toLowerCase().replace(" ", "")}`} style={{ color: "#ac1352", textDecoration: "none" }}>
        {item}
      </Link>
    ),
  }));

  return (
    <Header
      className="navbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        backgroundColor: "#fff",
      }}
    >
      <Title level={3} style={{ color: "#ac1352", margin: 0 }}>
        <Link to="/" style={{ color: "#ac1352", textDecoration: "none" }}>Book Shop</Link>
      </Title>

      {!isMobile && (
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          style={{
            backgroundColor: "transparent",
            borderBottom: "none",
            color: "#ac1352",
            fontSize: "15px",
            flexGrow: 1,
            justifyContent: "center",
          }}
          className="desktop-menu"
        />
      )}

      {isMobile && (
        <Button
          className="mobile-menu-icon"
          icon={<MenuOutlined />}
          type="text"
          onClick={() => setVisible(true)}
          style={{ fontSize: "20px", color: "#ac1352" }}
        />
      )}

      <div>
        {isAuthenticated ? (
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <Button type="text" style={{ color: "#ac1352", fontSize: "18px" }}>
              <Avatar icon={<UserOutlined />} style={{ backgroundColor: "#ac1352", color: "#fff" }} /> <DownOutlined />
            </Button>
          </Dropdown>
        ) : (
          <Link to="/login">
            <Button
              type="primary"
              style={{
                backgroundColor: "#ac1352",
                color: "#fff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                fontSize: "15px",
              }}
            >
              Login
            </Button>
          </Link>
        )}
      </div>

      <Drawer title="Menu" placement="right" onClose={() => setVisible(false)} open={visible}>
        <Menu mode="vertical" items={menuItems} style={{ fontSize: "18px" }} />
      </Drawer>
    </Header>
  );
};

export default Navbar;