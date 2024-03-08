import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    return <Navigate to="/login" replace />; // replace prevents infinite loops
  }

  return children;
};

export default PrivateRoute;
