import React, { useEffect, useState } from "react";
import {
  ProSidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import JournalEntries from "./JournalEntries";

const SidebarPro = ({ toggle, setToggle }) => {
  const { name } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };
  useEffect(() => {
    const divOverlay = document.getElementsByClassName("overlay")[0];

    divOverlay.addEventListener("click", overlay);
    function overlay() {
      setToggle(false);
    }

    return () => {
      divOverlay.removeEventListener("click", overlay);
    };
  }, []);

  return (
    <ProSidebar breakPoint="sm" toggled={toggle}>
      <SidebarHeader>
        <div className="journal__sidebar-navbar">
          <div className="journal__sidebar-header">
            <div>
              <span className="journal__sidebar-name">
                <i class="fa-solid fa-user"></i>
              </span>
              {name}
            </div>

            <div onClick={handleLogout}>
              <span className="text-red" style={{ cursor: "pointer" }}>
                <i class="fa-solid fa-right-from-bracket"></i>
              </span>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <aside className="journal__sidebar">
          <div className="journal__new-entry mt-5">
            <i className="far fa-calendar-plus fa-5x"></i>
            <p className="mt-2">New entry</p>
          </div>
          <JournalEntries />
        </aside>
      </SidebarContent>
    </ProSidebar>
  );
};

export default SidebarPro;
