import React, { useEffect } from "react";
import { ProSidebar, SidebarHeader, SidebarContent } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { startNewNote } from "../../actions/notes";
import { types } from "../../types/types";
import JournalEntries from "./JournalEntries";

const SidebarPro = () => {
  const { name } = useSelector((state) => state.auth);

  const { toggled } = useSelector((state) => state.sidebar);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };
  useEffect(() => {
    const divOverlay = document.getElementsByClassName("overlay")[0];

    divOverlay.addEventListener("click", overlay);
    function overlay() {
      dispatch({
        type: types.sidebarToggle,
        payload: false,
      });
    }

    return () => {
      divOverlay.removeEventListener("click", overlay);
    };
  }, []);

  const handleAddEntry = () => {
    dispatch(startNewNote());
    dispatch({
      type: types.sidebarToggle,
      payload: false,
    });
  };

  return (
    <ProSidebar breakPoint="sm" toggled={toggled}>
      <SidebarHeader>
        <div className="journal__sidebar-navbar">
          <div className="journal__sidebar-header">
            <div className="journal__sidebar-header-name">
              <i className="fa-solid fa-user"></i>
              {name}
            </div>

            <div onClick={handleLogout} data-testid="logout">
              <span className="text-red" style={{ cursor: "pointer" }}>
                <i className="fa-solid fa-right-from-bracket"></i>
              </span>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <aside className="journal__sidebar">
          <div
            className="journal__new-entry mt-5"
            onClick={handleAddEntry}
            data-testid="newentry"
          >
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
