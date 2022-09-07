import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import Swal from "sweetalert2";

export const startNewNote = () => {
  return (dispatch) => {
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    dispatch(activeNote("0", newNote));
  };
};

export const activeNote = (noteId, note) => {
  return {
    type: types.notesActive,
    payload: {
      id: noteId,
      ...note,
    },
  };
};

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => {
  return {
    type: types.notesLoad,
    payload: notes,
  };
};

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!note.url) {
      delete note.url;
    }
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    try {
      const currentNote = await getDoc(
        doc(db, `${uid}/journal/notes/${note.id}`)
      );

      if (currentNote.exists()) {
        await updateDoc(
          doc(db, `${uid}/journal/notes/${note.id}`),
          noteToFirestore
        );
        dispatch(refreshNote(note.id, note));
        Swal.fire({
          title: "Note saved!",
          icon: "success",
        });
        dispatch(refreshNote(note.id, noteToFirestore));
      } else {
        const doc = await addDoc(
          collection(db, `${uid}/journal/notes`),
          noteToFirestore
        );

        dispatch(
          addNote({
            id: doc.id,
            ...noteToFirestore,
          })
        );
        Swal.fire({
          title: "Note saved!",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error, please try again",
        icon: "error",
      });
    }
  };
};

export const refreshNote = (id, note) => {
  return {
    type: types.notesUpdated,
    payload: {
      id,
      note: {
        id,
        ...note,
      },
    },
  };
};

export const addNote = (note) => {
  return {
    type: types.notesAddNew,
    payload: {
      ...note,
    },
  };
};

export const startDeleteNote = (noteId) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    try {
      await deleteDoc(doc(db, `${uid}/journal/notes/${noteId}`));
      dispatch(deleteNote(noteId));
      Swal.fire({
        title: "Note deleted!",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error, please try again",
        icon: "error",
      });
    }
  };
};

export const deleteNote = (id) => {
  return {
    type: types.notesDelete,
    payload: {
      id,
      note: {
        title: "",
        body: "",
        date: new Date().getTime(),
      },
    },
  };
};
