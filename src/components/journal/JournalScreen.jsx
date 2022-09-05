import React from "react";
import NotesScreen from "../notes/NotesScreen";
import Sidebar from "./Sidebar";

const JournalScreen = () => {
  return (
    <div className="journal__main-content">
      <Sidebar />
      <main>
        <NotesScreen />
        {/* <NothingSelected /> */}
      </main>
    </div>
  );
};

export default JournalScreen;
