import { notesReducer } from "../../reducers/notesReducer";
import { types } from "../../types/types";

describe("pruebas en el notesReducer", () => {
  test("debe borrar  las notas", () => {
    const initialState = {
      notes: [
        {
          id: "jajsjasjsa",
          body: "jasjsjsa",
        },
        {
          id: "1111",
          body: "body",
        },
      ],
      active: null,
    };

    const action = {
      type: types.notesLogoutCleaning,
      payload: {},
    };

    const state = notesReducer(initialState, action);

    expect(state).toEqual({
      notes: null,
      active: null,
    });
  });

  test("debe agregar  la nota", () => {
    const initialState = {
      notes: [],
      active: null,
    };

    const note = {
      id: "02",
      title: "jajaja",
    };

    const state = notesReducer(initialState, {
      type: types.notesAddNew,
      payload: note,
    });

    expect(state).not.toEqual([]);
  });

  test("debe actualizar  la nota", () => {
    const initialState = {
      notes: [
        {
          id: "01",
          body: "hola",
        },
      ],
      active: null,
    };

    const note = {
      title: "jajaja",
    };

    const state = notesReducer(initialState, {
      type: types.notesUpdated,
      payload: {
        id: "01",
        note: {
          id: "01",
          ...note,
        },
      },
    });

    expect(state).toEqual({
      notes: [
        {
          id: "01",
          title: "jajaja",
        },
      ],
      active: null,
    });
  });

  test("debe borrar la nota", () => {
    const initialState = {
      notes: [
        {
          id: "01",
          body: "hola",
        },
        {
          id: "02",
          body: "hola",
        },
        {
          id: "03",
          body: "hola",
        },
      ],
      active: null,
    };

    const action = {
      type: types.notesDelete,
      payload: {
        id: "02",
      },
    };

    const state = notesReducer(initialState, action);

    expect(state).toEqual({
      notes: [
        {
          id: "01",
          body: "hola",
        },
        {
          id: "03",
          body: "hola",
        },
      ],
      active: null,
    });
  });
});
