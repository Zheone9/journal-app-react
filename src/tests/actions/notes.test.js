import { beforeEach, describe, expect, test, vi } from "vitest";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startSaveNote, startUploading } from "../../actions/notes";
import { types } from "../../types/types";
import Swal from "sweetalert2";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

vi.mock("../../helpers/fileUpload", () => ({
  fileUpload: vi.fn(() => {
    return Promise.resolve("https://hola-mundo.com/foto.png");
  }),
}));

vi.mock("sweetalert2", () => {
  return {
    default: { fire: vi.fn(), close: vi.fn() },
  };
});

const initState = {
  auth: {
    uid: "TESTING",
  },
  notes: {
    active: {
      id: "2gPdAKh7kbUudBpX3b4U",
      title: "Hola",
      body: "Mundo",
    },
  },
};

let store = mockStore(initState);

describe("Tests actions Notes", () => {
  beforeEach(() => {
    store = mockStore(initState);
    vi.clearAllMocks();
  });
  test("should refresh or add the note", async () => {
    const note = {
      id: "2gPdAKh7kbUudBpX3b4U",
      title: "Hola",
      body: "Mundo",
      date: 0,
    };

    await store.dispatch(startSaveNote(note));
    const actions = store.getActions();

    const currentNote = await getDoc(
      doc(db, `TESTING/journal/notes/${note.id}`)
    );

    expect(currentNote.data()).toEqual({
      body: "Mundo",
      title: "Hola",
      date: expect.any(Number),
    });

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

  test("should update the url of the entry", async () => {
    const file = new File([], "foto.jpg");
    await store.dispatch(startUploading(file));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: "2gPdAKh7kbUudBpX3b4U",
        title: "Hola",
        body: "Mundo",
        url: "https://hola-mundo.com/foto.png",
      },
    });

    expect(Swal.fire).toHaveBeenCalledWith({
      title: "Uploading",
      text: "Please wait",
      allowOutsideClick: false,
    });

    expect(Swal.close).toHaveBeenCalledTimes(1);
  });
});
