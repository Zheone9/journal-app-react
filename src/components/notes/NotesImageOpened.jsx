import React from "react";

const NotesImageOpened = ({ imageUrl, setOpenedImage }) => {
  return (
    <div className="notes__opened-image animate__animated animate__fadeIn animate__faster">
      <i
        class="fa-regular fa-rectangle-xmark icon-close-modal"
        onClick={() => setOpenedImage(false)}
      ></i>

      <img src={imageUrl} alt="Image" className="notes__opened-image-img" />
    </div>
  );
};

export default NotesImageOpened;
