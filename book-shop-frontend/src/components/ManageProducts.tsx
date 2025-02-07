import React, { useState, useEffect } from "react";
import { Table, Button, Modal, message, Spin, Typography, Card } from "antd";
import axios from "axios";
import { DeleteOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

interface Product {
  _id: string;
  title: string;
  price: number;
}

const ManageProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:5000/products");
      setProducts(data);
    } catch (error) {
      message.error("Failed to fetch products!");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      cancelText: "Cancel",
      okType: "danger",
      onOk: async () => {
        setDeleting(id);
  
        try {
          console.log(`Sending DELETE request to: http://localhost:5000/products/${id}`);
  
          const response = await axios.delete(`http://localhost:5000/products/${id}`);
          
          console.log(response);
          if (response.status === 200) {
            setProducts(products.filter((product) => product._id !== id));
            message.success("Product deleted successfully!");
          } else {
            message.error(`Failed to delete product: ${response.data.message || "Unknown error"}`);
          }
        } catch (error) {
          console.error("Error during product deletion:", error);
         
        } finally {
          setDeleting(null);
        }
      },
    });
  };
  
  

  const columns = [
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price (USD)",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: Product) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          loading={deleting === record._id}
          onClick={() => deleteProduct(record._id)}
          style={{
            backgroundColor: "#f5222d",
            color: "white",
            borderColor: "#f5222d",
            transition: "all 0.3s",
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ marginBottom: "24px", textAlign: "center" }}>
        <Title level={2} style={{ color: "#1890ff" }}>
          Manage Products
        </Title>
      </div>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Card
          style={{
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <Table
            dataSource={products}
            columns={columns}
            rowKey="_id"
            bordered
            pagination={{ pageSize: 5 }}
            style={{
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
            }}
          />
          <div style={{ marginTop: "20px" }}>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/admin-dashboard")}
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
      )}
    </div>
  );
};

export default ManageProducts;
