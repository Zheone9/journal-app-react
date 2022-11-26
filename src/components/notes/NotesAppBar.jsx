import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startDeleteNote,
  startSaveNote,
  startUploading,
} from "../../actions/notes";
import moment from "moment";
import Swal from "sweetalert2";

const NotesAppBar = ({ title, body }) => {
  const dispatch = useDispatch();
  const { active: note, notes } = useSelector((state) => state.notes);

  const noteDate = moment(note.date);

  const handleSaveNote = () => {
    if (!canSaveNote()) {
      return;
    }

    dispatch(startSaveNote(note));
  };

  const canSaveNote = () => {
    return title.trim().length > 0 || body.trim().length > 0;
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
  const handlePictureClick = () => {
    document.querySelector("#fileSelector").click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };
  return (
    <div className="notes__appbar">
      <div>
        <span>{noteDate.format("LL")}</span>
        <input
          id="fileSelector"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
      <div className="notes__appbar-header">
        <button className="btn btn-outline" onClick={handlePictureClick}>
          Picture
        </button>
        <button
          className={
            canSaveNote() ? "btn btn-outline btn-success" : "btn disabled"
          }
          onClick={handleSaveNote}
          disabled={!canSaveNote()}
        >
          Save
        </button>
        {notes.length > 0 && (
          <button className="btn btn-danger p-se-2" onClick={handleNoteDelete}>
            <i className="fa-solid fa-trash"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default NotesAppBar;
