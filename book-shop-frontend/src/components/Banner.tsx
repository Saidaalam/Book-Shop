import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Banner: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        height: "500px",
        backgroundImage:
          "url(https://static.vecteezy.com/system/resources/previews/015/486/193/non_2x/girl-reads-book-in-old-luxury-library-at-night-free-vector.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
        }}
      ></div>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
            marginBottom: "20px",
          }}
        >
          Welcome to Book Shop
        </h1>
        <p
          style={{
            fontSize: "20px",
            margin: "0 auto 30px",
            textShadow: "1px 1px 8px rgba(0, 0, 0, 0.4)",
          }}
        >
          Explore a wide range of books and discover your next great read.
        </p>
        <Link to="/products">
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: "#ac1352",
              color: "#fff",
              fontSize: "18px",
              padding: "12px 24px",
              borderRadius: "8px",
            }}
          >
            Shop Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
