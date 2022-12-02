import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  login,
  logout,
  startLoginEmailPassword,
  startLogout,
  startRegisterWithEmailAndPasswordName,
} from "../../actions/auth";
import { types } from "../../types/types";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};

let store = mockStore(initState);

describe("Testing Auth actions", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  test("should create respective action ", () => {
    const uid = "ABC123";
    const displayName = "George";

    const loginAction = login(uid, displayName);
    const logoutAction = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName,
      },
    });

    expect(logoutAction).toEqual({
      type: types.logout,
    });
  });

  test("should perform the logout", async () => {
    await store.dispatch(startLogout());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.logout,
    });
    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning,
    });
  });

  test("should start the method startLoginEmailPassword", async () => {
    /*
     ** a user must be created in the firestore authentication first
     */

    await store.dispatch(
      startLoginEmailPassword("test@testing.com", "mipassword123")
    );
    const actions = store.getActions();
    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: expect.any(String),
        displayName: expect.any(String),
      },
    });
  });

  test("should not be allowed to register  ", async () => {
    await store.dispatch(
      startRegisterWithEmailAndPasswordName(
        "test@testing.com",
        "mipassword123",
        "jorge"
      )
    );
    const actions = store.getActions();
    expect(actions).toStrictEqual([]);
  });
});
