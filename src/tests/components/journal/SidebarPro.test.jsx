import { test, describe, expect, vi, beforeEach } from "vitest";
import React from "react";

import SidebarPro from "../../../components/journal/SidebarPro";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { fireEvent, render, screen } from "@testing-library/react";
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/notes";

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
    active: null,
    notes: [],
  },
  sidebar: {
    toggled: false,
  },
};

let store = mockStore(initState);

vi.mock("../../../actions/auth", () => ({
  startLogout: vi.fn(),
}));

vi.mock("../../../actions/notes", () => ({
  startNewNote: vi.fn(),
}));

store.dispatch = vi.fn();

render(
  <Provider store={store}>
    <SidebarPro />
  </Provider>
);

describe("Tests is <Sidebar/>", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("should display correctly", () => {
    expect(screen).toMatchSnapshot();
    expect(screen.getByText("test")).toBeDefined();
  });

  test("should call startLogout", async () => {
    fireEvent.click(screen.getByTestId("logout"));
    expect(startLogout).toHaveBeenCalled();
  });

  test("should call startNewNote", () => {
    fireEvent.click(screen.getByTestId("newentry"));
    console.log(store.getActions());
    expect(startNewNote).toHaveBeenCalled();
  });
});
