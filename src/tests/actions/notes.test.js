import { doc, getDoc } from "firebase/firestore";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startNewNote } from "../../actions/notes";
import { db } from "../../firebase/firebase-config";
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

describe("pruebas en notes action", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("debe iniciar una nueva nota", async () => {
    await store.dispatch(startNewNote());
    const actions = store.getActions();
    //   console.log(actions);

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    });
  });

  // test("debe cargar las notas", async () => {
  //   await store.dispatch(startLoadingNotes("TESTING"));
  // });

  test("debe de actualizar la nota", async () => {
    const note = {
      id: "2gPdAKh7kbUudBpX3b4U",
      title: "titulo",
      body: "lorem ipsum dolor sit",
    };

    const document = await getDoc(doc(db, `TESTING/journal/notes/${note.id}`));

    const actions = store.getActions();
    console.log(actions);
  });
});
