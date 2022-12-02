import { beforeEach, describe, expect, test, vi } from "vitest";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fireEvent, render, screen } from "@testing-library/react";
import JournalEntry from "../../../components/journal/JournalEntry";
import { activeNote } from "../../../actions/notes";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  notes: {
    notes: [],
    active: null,
  },
  sidebar: {
    toggled: false,
  },
};
let store = mockStore(initState);

store.dispatch = vi.fn();
const note = {
  id: 10,
  date: 0,
  title: "Hola",
  body: "Mundo",
  url: "https://algunlugar.com/foto.jpg",
};
render(
  <Provider store={store}>
    <JournalEntry note={note} />
  </Provider>
);
describe("Tests in <JournalEntry/ >", () => {
  test("should display correctly", () => {
    expect(screen).toMatchSnapshot();
  });
  test("should fire activeNote", () => {
    const entry = screen.getByTestId("journal-entry");
    fireEvent.click(entry);

    expect(store.dispatch).toHaveBeenCalledWith(
      activeNote(note.id, { ...note })
    );
  });
});
