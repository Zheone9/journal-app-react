import React from "react";
import { Outlet } from "react-router-dom";

const AuthMain = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container animate__animated animate__fadeInUp">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthMain;
