import React from "react";
import { Navigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

const PrivateRoute = ({ element, isLoggedIn, notes }) => {
  if (!notes) {
    return <LoadingScreen />;
  }

  return isLoggedIn ? element : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
