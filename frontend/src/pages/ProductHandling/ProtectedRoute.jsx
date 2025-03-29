import React from "react";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const ProtectedRoute = ({ children, isAdmin = false }) => {
  const isAuthenticated = localStorage.getItem("isAdmin") === "true";

  if (!isAuthenticated) {
    // If not authenticated, redirect to admin login
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedRoute;
