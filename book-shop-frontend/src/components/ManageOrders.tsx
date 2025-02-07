import React, { useState, useEffect } from "react";
import { Table, Select, Button, message, Card, Typography } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const { Title } = Typography;

// Define the type for an Order
interface Order {
  _id: string;
  orderId: string;
  userId: string;
  bookId: string;
  quantity: number;
  totalPrice: number;
  orderDate: string;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
}

const ManageOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Order[]>("http://localhost:5000/orders")
      .then((res) => setOrders(res.data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const updateOrderStatus = async (id: string, status: Order["status"]) => {
    try {
      await axios.patch(`http://localhost:5000/orders/${id}`, { status });
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === id ? { ...order, status } : order))
      );
      message.success("Order Status Updated!");
    } catch (error) {
      message.error("Update failed!");
    }
  };

  const columns = [
    { title: "Order ID", dataIndex: "orderId", key: "orderId" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { 
      title: "Total Price", 
      dataIndex: "totalPrice", 
      key: "totalPrice", 
      render: (price: number) => `$${price.toFixed(2)}` 
    },
    { title: "Order Date", dataIndex: "orderDate", key: "orderDate" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: Order["status"], record: Order) => (
        <Select value={status} onChange={(value) => updateOrderStatus(record._id, value)} style={{ width: 120 }}>
          <Option value="Pending">Pending</Option>
          <Option value="Shipped">Shipped</Option>
          <Option value="Delivered">Delivered</Option>
          <Option value="Cancelled">Cancelled</Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <Card className="shadow-lg rounded-lg bg-white p-6">
        <Title level={3} className="text-blue-600 text-center mb-4">
          Manage Orders
        </Title>

        <Table
          dataSource={orders}
          columns={columns}
          rowKey="_id"
          bordered
          pagination={{ pageSize: 5 }}
        />

        <div className="flex justify-center">
          <Button
            type="primary"
            onClick={() => navigate("/admin-dashboard")}
            style={{
              backgroundColor: "#1890ff",
              color: "white",
              borderColor: "#1890ff",
              fontSize: "16px",
            }}
          >
            Go to Admin Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ManageOrders;
