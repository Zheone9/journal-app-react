import { render } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import React from "react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { login } from "../../actions/auth";
import AppRouter from "../../routers/AppRouter";
import { act } from "react-test-renderer";
import { auth } from "../../firebase/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

vi.mock("../../actions/auth", () => ({
  login: vi.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null,
  },
  notes: [],
  active: null,
};
let store = mockStore(initState);
store.dispatch = vi.fn();

describe("Tests in <AppRouter/>", () => {
  test("should call the login if the user is authenticaded", async () => {
    let user;
    await act(async () => {
      const userCred = await signInWithEmailAndPassword(
        auth,
        "test@testing.com",
        "mipassword123"
      );
      user = userCred.user;

      render(
        <Provider store={store}>
          <AppRouter />
        </Provider>,
        { wrapper: MemoryRouter }
      );
    });

    expect(login).toHaveBeenCalledWith(user.uid, user.displayName);
  });
});
