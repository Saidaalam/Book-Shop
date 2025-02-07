import React from "react";
import { Product } from "../services/api";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border p-4">
      <img src="https://via.placeholder.com/150" alt={product.name} />
      <h2 className="font-bold">{product.name}</h2>
      <p>{product.author}</p>
      <p>${product.price}</p>
      <Link to={`/product/${product._id}`} className="text-blue-500">View Details</Link>
    </div>
  );
};

export default ProductCard;
