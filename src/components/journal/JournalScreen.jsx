import React, { useState } from "react";
import NotesScreen from "../notes/NotesScreen";
import NothingSelected from "./NothingSelected";
import SidebarPro from "./SidebarPro";

const JournalScreen = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <div onClick={handleToggle} className="btn-toggle">
        <i class="fa-solid fa-bars"></i>
      </div>
      <div className="journal__main-content">
        <SidebarPro toggle={toggle} setToggle={setToggle} />
        <main>
          <NotesScreen />
          {/* <NothingSelected /> */}
        </main>
      </div>
    </>
  );
};

export default JournalScreen;
