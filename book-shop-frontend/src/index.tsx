
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './styles/index.css';
import { AuthProvider } from "./contexts/AuthContext";
import React from "react";
import { CartProvider } from "./contexts/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <BrowserRouter>
  <React.StrictMode>
  <AuthProvider>
  <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
</React.StrictMode>
  </BrowserRouter>
);
