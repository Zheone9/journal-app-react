import React from "react";

const NotesAppBar = () => {
  return (
    <div className="notes__appbar">
      <span>29 de agosto 2022</span>
      <div>
        <button className="btn btn-outline">Picture</button>
        <button className="btn btn-outline">Save</button>
      </div>
    </div>
  );
};

export default NotesAppBar;
