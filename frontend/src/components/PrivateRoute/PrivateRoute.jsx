import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/" replace />; // replace prevents infinite loops from to="/login"-> to="/"
  }

  return children;
};

export default PrivateRoute;
