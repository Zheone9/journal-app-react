import React from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { activeNote } from "../../actions/notes";
import { types } from "../../types/types";

const JournalEntry = ({ note }) => {
  const noteDate = moment(note.date);
  const dispatch = useDispatch();
  const { toggled } = useSelector((state) => state.sidebar);
  const { active } = useSelector((state) => state.notes);

  const handleEntryClick = () => {
    dispatch(activeNote(note.id, note));

    if (toggled) {
      dispatch({ type: types.sidebarToggle, payload: false });
    }
  };
  return (
    <div
      className={
        note.id === active?.id ? "journal__entry note-active" : "journal__entry"
      }
      onClick={handleEntryClick}
    >
      {note.url && (
        <div
          className="journal__entry-picture "
          style={{
            // backgroundColor: "cover",
            backgroundImage: `url(${note.url})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      )}
      <div className="journal__entry-body">
        <p className="journal__entry-title"> {note.title}</p>

        <p className="journal__entry-content">{note.body}</p>
      </div>
      <div className="journal__entry-date-box">
        <span>{noteDate.format("dddd")}</span>
        <h4>{noteDate.format("Do")}</h4>
      </div>
    </div>
  );
};

export default JournalEntry;
