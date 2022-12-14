import { types } from "../types/types";

const initialState = {
  notes: null,
  active: null,
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };

    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload],
      };

    case types.notesUpdated:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };

    case types.notesAddNew:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
        active: {
          ...action.payload,
        },
      };

    case types.notesDelete:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload.id),
        active: null,
      };
    case types.notesLogoutCleaning: {
      return {
        ...state,
        active: null,
        notes: null,
      };
    }
    default:
      return state;
  }
};
