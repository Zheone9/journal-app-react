import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import NotesAppBar from "./NotesAppBar";

const NotesScreen = () => {
  const { active } = useSelector((state) => state.notes);

  const dispatch = useDispatch();
  const [formValues, handleInputChange, reset] = useForm(active);

  const { body, title } = formValues;

  const activeId = useRef(active.id);

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues]);

  useEffect(() => {
    if (active.id !== activeId.current) {
      reset(active);
      activeId.current = active.id;
    }
  }, [active, reset]);

  return (
    <div className="notes__main-content">
      <NotesAppBar title={title} body={body} />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          value={title}
          name="title"
          onChange={handleInputChange}
        />
        <textarea
          placeholder="What happened today?"
          className="notes__textarea"
          value={body}
          onChange={handleInputChange}
          name="body"
        ></textarea>
        {/* {note.url && (
          <div className="notes__image">
            <img
              src="https://media.istockphoto.com/photos/sunset-and-sunrise-on-the-baobab-road-in-madagascar-picture-id1219826421?k=20&m=1219826421&s=612x612&w=0&h=m9sEH81Dg3KEzHY3d8m9TkK_Agb1AIrZyT-sJAGgNbE="
              alt="Image"
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default NotesScreen;
