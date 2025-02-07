import React, { useState, useEffect } from "react";
import { Table, Button, message, Typography, Spin, Card, Input, Badge } from "antd";
import { ArrowLeftOutlined, CheckCircleOutlined, CloseCircleOutlined, ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Use useNavigate hook

const { Title } = Typography;
const { Search } = Input;

interface User {
  _id: string;
  name: string;
  email: string;
  active: boolean;
}

const ManageUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [updating, setUpdating] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();  // Initialize useNavigate hook

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/users");
      setUsers(data);
    } catch (error) {
      message.error("Failed to fetch users!");
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (id: string, status: boolean) => {
    setUpdating(id);
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, { active: !status });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, active: !status } : user
        )
      );
      message.success(`User ${status ? "Deactivated" : "Activated"}!`);
    } catch (error) {
      message.error("Action failed!");
    } finally {
      setUpdating(null);
    }
  };

  // Filter Users Based on Search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
      render: (active: boolean) => (
        <Badge
          status={active ? "success" : "error"}
          text={active ? "Active" : "Inactive"}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: User) => (
        <Button
          type={record.active ? "primary" : "default"}
          danger={record.active}
          loading={updating === record._id}
          icon={record.active ? <CloseCircleOutlined /> : <CheckCircleOutlined />}
          onClick={() => toggleUserStatus(record._id, record.active)}
        >
          {record.active ? "Deactivate" : "Activate"}
        </Button>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <Card
        className="shadow-lg rounded-lg bg-white"
        title={<Title level={3} className="text-blue-600">Manage Users</Title>}
        extra={
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={fetchUsers}
            loading={loading}
          >
            Refresh
          </Button>
        }
      >
        {/* Search Bar */}
        <div className="mb-4 flex justify-end">
          <Search
            placeholder="Search users..."
            onChange={(e) => setSearchTerm(e.target.value)}
            enterButton={<SearchOutlined />}
            style={{ maxWidth: "300px" }}
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            dataSource={filteredUsers}
            columns={columns}
            rowKey="_id"
            bordered
            pagination={{ pageSize: 5 }}
          />
        )}

        {/* Back to Dashboard Button */}
        <div style={{ marginTop: "20px" }}>
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate("/admin-dashboard")}  // Use navigate for redirection
            style={{
              marginRight: "8px",
              backgroundColor: "#1890ff",
              color: "white",
              borderColor: "#1890ff",
            }}
          >
            Back to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ManageUsers;
