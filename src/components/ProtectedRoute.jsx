import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ role, children }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const normalizedRole = userRole?.replace("ROLE_", ""); 

  if (!token || normalizedRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
