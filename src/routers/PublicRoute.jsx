import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element, isLoggedIn }) => {
  return isLoggedIn ? <Navigate to="/" replace={true} /> : element;
};

export default PublicRoute;
