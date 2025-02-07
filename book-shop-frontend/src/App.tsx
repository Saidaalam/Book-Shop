import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/AllProducts";
import Contact from "./pages/Contact";
import AboutUs from "./pages/About";
import Cart from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetails from "./components/ProductDetails";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./utils/PrivateRoute";
import DashboardPage from "./pages/DashboardPage";
import ManageProducts from "./components/ManageProducts";
import ManageUsers from "./components/ManageUsers";
import ManageOrders from "./components/ManageOrders";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentCancel from "./components/PaymentCancel";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      
      {/* Admin Protected Routes */}
      <Route element={<PrivateRoute role="admin" />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/products" element={<ManageProducts />} />
        <Route path="/admin-dashboard/users" element={<ManageUsers/>} />
        <Route path="/admin-dashboard/orders" element={<ManageOrders />} />
      </Route>
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancel" element={<PaymentCancel />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
