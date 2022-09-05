import React from "react";
import { Outlet } from "react-router-dom";

const AuthMain = () => {
  return (
    <div className="">
      <Outlet />
    </div>
  );
};

export default AuthMain;
