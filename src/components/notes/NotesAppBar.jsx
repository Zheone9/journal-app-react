import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startDeleteNote, startSaveNote } from "../../actions/notes";
import moment from "moment";
import Swal from "sweetalert2";

const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active: note, notes } = useSelector((state) => state.notes);

  const noteDate = moment(note.date);

  const handleSaveNote = () => {
    dispatch(startSaveNote(note));
  };

  const handleNoteDelete = async () => {
    const { value: confirm } = await Swal.fire({
      title: "Are you sure you want to delete the note?",
      icon: "warning",
      confirmButtonText: "Yes",
      showCancelButton: true,
    });

    if (confirm) {
      dispatch(startDeleteNote(note.id));
    }
  };

  return (
    <div className="notes__appbar">
      <div>
        <span>{noteDate.format("LL")}</span>
      </div>
      <div className="notes__appbar-header">
        <button className="btn btn-outline">Picture</button>
        <button className="btn btn-outline" onClick={handleSaveNote}>
          Save
        </button>
        {notes.length > 0 && (
          <button className="btn btn-danger" onClick={handleNoteDelete}>
            <b>Delete</b>
          </button>
        )}
      </div>
    </div>
  );
};

export default NotesAppBar;
