import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import NotesAppBar from "./NotesAppBar";
import NotesImageOpened from "./NotesImageOpened";
import Modal from "react-modal";

const customStyles = {
  overlay: { zIndex: 1000000, backgroundColor: "rgba(67, 67, 67, 0.93)" },
  content: {
    background: "#232323",
    border: "none",
    borderRadius: "4px",
  },
};
const NotesScreen = () => {
  const { active } = useSelector((state) => state.notes);

  const dispatch = useDispatch();
  const [formValues, handleInputChange, reset] = useForm(active);
  const [openedImage, setOpenedImage] = useState(false);

  const { body, title } = formValues;
  const activeId = useRef(active.id);

  useEffect(() => {
    dispatch(
      activeNote(formValues.id, {
        ...formValues,
        url: !active.url ? "" : active.url,
      })
    );
  }, [formValues]);

  useEffect(() => {
    if (active.id !== activeId.current) {
      reset(active);
      activeId.current = active.id;
    }
  }, [active, reset]);
  const handleImageClick = () => {
    setOpenedImage(!openedImage);
  };

  return (
    <div className="notes__main-content">
      <Modal
        appElement={document.querySelector("#root")}
        isOpen={openedImage}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <NotesImageOpened
          imageUrl={active.url}
          setOpenedImage={setOpenedImage}
        />
      </Modal>
      <NotesAppBar title={title} body={body} />
      <div className="notes__content">
        <input
          data-testid="inptitle"
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          value={title}
          name="title"
          onChange={handleInputChange}
        />
        <textarea
          data-testid="txtarea"
          placeholder="What happened today?"
          className="notes__textarea"
          value={body}
          onChange={handleInputChange}
          name="body"
        ></textarea>
        {active.url && (
          <div className="notes__image">
            <i
              class="fa-regular fa-rectangle-xmark icon-delete-image"
              onClick={() => {
                dispatch(
                  activeNote(formValues.id, {
                    ...formValues,
                    url: "",
                  })
                );
              }}
            ></i>
            <div className="notes__image-img">
              <img src={active.url} alt="Image" onClick={handleImageClick} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesScreen;
