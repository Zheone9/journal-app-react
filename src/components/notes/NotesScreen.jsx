import React from "react";
import NotesAppBar from "./NotesAppBar";

const NotesScreen = () => {
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
        />
        <textarea
          className="notes__textarea"
          name="description"
          defaultValue="What happened today?"
        ></textarea>
        <div className="notes__image">
          <img
            src="https://media.istockphoto.com/photos/sunset-and-sunrise-on-the-baobab-road-in-madagascar-picture-id1219826421?k=20&m=1219826421&s=612x612&w=0&h=m9sEH81Dg3KEzHY3d8m9TkK_Agb1AIrZyT-sJAGgNbE="
            alt="Image"
          />
        </div>
      </div>
    </div>
  );
};

export default NotesScreen;
