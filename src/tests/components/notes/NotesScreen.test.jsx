import { beforeEach, describe, expect, test, vi } from "vitest";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import NotesScreen from "../../../components/notes/NotesScreen";
import { activeNote } from "../../../actions/notes";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {
    name: "test",
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: "1234",
      title: "Hola",
      body: "Mundo",
    },
    notes: [],
  },
  sidebar: {
    toggled: false,
  },
};
let store = mockStore(initState);
store.dispatch = vi.fn();

vi.mock("../../../actions/notes", () => ({
  activeNote: vi.fn(),
}));

render(
  <Provider store={store}>
    <NotesScreen />
  </Provider>
);
describe("Tests in <NotesScreen />", () => {
  beforeEach(() => {
    store = mockStore(initState);
    vi.clearAllMocks();
  });

  test("should display correctly ", () => {
    expect(screen).toMatchSnapshot();
    expect(screen.getByTestId("txtarea")).toBeDefined();
  });

  test("should fire activeNote", () => {
    const inputTitle = screen.getAllByTestId("inptitle");
    const newTitle = "New Note";
    fireEvent.change(inputTitle[0], {
      target: { name: "title", value: newTitle },
    });
    expect(activeNote).toHaveBeenLastCalledWith("1234", {
      body: "Mundo",
      id: "1234",
      title: newTitle,
      url: "",
    });
  });
});
