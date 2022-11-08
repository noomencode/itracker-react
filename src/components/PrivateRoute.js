import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.userLogin.userInfo);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
