import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../actions/sidebar";
import NotesScreen from "../notes/NotesScreen";
import NothingSelected from "./NothingSelected";
import SidebarPro from "./SidebarPro";

const JournalScreen = () => {
  const dispatch = useDispatch();
  const { toggled } = useSelector((state) => state.sidebar);

  const handleToggle = () => {
    dispatch(toggleSidebar(!toggled));
  };
  const { active } = useSelector((state) => state.notes);
  return (
    <>
      <div onClick={handleToggle} className="btn-toggle">
        <i className="fa-solid fa-bars"></i>
      </div>
      <div className="journal__main-content">
        <SidebarPro />
        <main>{active ? <NotesScreen /> : <NothingSelected />}</main>
      </div>
    </>
  );
};

export default JournalScreen;
