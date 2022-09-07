import React from "react";
import { useSelector } from "react-redux";
import JournalEntry from "./JournalEntry";

const JournalEntries = ({ collapsed, setToggle }) => {
  const { notes } = useSelector((state) => state.notes);

  return (
    <div className="journal__entries mt-5">
      {notes.map((note) => (
        <JournalEntry
          collapsed={collapsed}
          setToggle={setToggle}
          key={note.id}
          note={note}
        />
      ))}
    </div>
  );
};

export default JournalEntries;
