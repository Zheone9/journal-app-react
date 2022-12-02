import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import LoginScreen from "../../../components/auth/LoginScreen";
import React from "react";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import { MemoryRouter } from "react-router-dom";
import {
  startGoogleLogin,
  startLoginEmailPassword,
} from "../../../actions/auth";

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
store.dispatch = vi.fn();

render(
  <Provider store={store}>
    <LoginScreen />
  </Provider>,
  { wrapper: MemoryRouter }
);

vi.mock("../../../actions/auth", () => ({
  startGoogleLogin: vi.fn(),
  startLoginEmailPassword: vi.fn(),
}));

describe("Tests in <LoginScreen/>", () => {
  beforeEach(() => {
    store = mockStore(initState);
    vi.clearAllMocks();
  });

  test("should display correctly", () => {
    expect(screen).toMatchSnapshot();
    expect(screen.getByPlaceholderText("Password")).toBeDefined();
    expect(screen.queryByText("Create new account")).toBeDefined();
  });

  test("Google login action should be triggered ", () => {
    const btn = document.getElementsByClassName("btn-google")[0];
    fireEvent.click(btn);
    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test("Login with email and password action should be triggered ", () => {
    fireEvent.click(screen.getAllByText("Login")[1]);

    expect(startLoginEmailPassword).toHaveBeenCalledWith(
      "test@example.com",
      12345
    );
  });
});
