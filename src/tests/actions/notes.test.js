import { describe, expect, test } from "vitest";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startSaveNote } from "../../actions/notes";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: "TESTING",
  },
  notes: {
    active: {
      id: "02L6n2ZPdEgpELw8y7ML",
      title: "Hola",
      body: "Mundo",
    },
  },
};

let store = mockStore(initState);

describe("test en notes", () => {
  test("debe actualizar la nota", async () => {
    const note = {
      id: "2gPdAKh7kbUudBpX3b4U",
      title: "Hola",
      body: "Mundo",
      date: 0,
    };

    await store.dispatch(startSaveNote(note));
    const actions = store.getActions();
    console.log(actions[0]);
    expect(actions[0]).toEqual({
      type: types.notesUpdated,
      payload: {
        id: "2gPdAKh7kbUudBpX3b4U",
        note: {
          id: "2gPdAKh7kbUudBpX3b4U",
          title: "Hola",
          body: "Mundo",
          date: 0,
        },
      },
    });
  });
});
