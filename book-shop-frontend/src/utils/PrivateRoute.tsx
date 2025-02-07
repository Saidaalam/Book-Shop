import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  role: "admin" | "user";
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
