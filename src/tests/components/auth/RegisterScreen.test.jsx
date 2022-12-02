import { beforeEach, describe, expect, test, vi } from "vitest";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import RegisterScreen from "../../../components/auth/RegisterScreen";
import React from "react";
import { types } from "../../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
};
let store = mockStore(initState);

render(
  <Provider store={store}>
    <RegisterScreen />
  </Provider>,
  { wrapper: MemoryRouter }
);
describe("Tests in RegisterScreen", () => {
  beforeEach(() => {
    // store = mockStore(initState);
    vi.clearAllMocks();
  });

  test("should display correctly", () => {
    expect(screen).toMatchSnapshot();
  });

  test("should dispatch the respective action", () => {
    const emailField = screen.getByTestId("email");
    fireEvent.change(emailField, { target: { value: "", name: "email" } });

    fireEvent.submit(screen.getByTestId("submit"), { preventDefault() {} });
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: "Email inválido",
    });

    fireEvent.change(emailField, {
      target: { value: "email@example.com", name: "email" },
    });
    fireEvent.submit(screen.getByTestId("submit"), { preventDefault() {} });
    const actions2 = store.getActions();
    expect(actions2[1]).toEqual({
      type: types.uiRemoveError,
    });
  });

  test("should display the alert box with the error", () => {
    const initState = {
      auth: {},
      ui: {
        loading: false,
        msgError: "Invalid email",
      },
    };
    const store = mockStore(initState);
    render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
      { wrapper: MemoryRouter }
    );

    expect(screen.getByTestId("alert-error")).toBeDefined();
    expect(screen.getByTestId("alert-error").textContent.trim()).toBe(
      initState.ui.msgError
    );
  });
});
