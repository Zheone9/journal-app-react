import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe("pruebas en authReducer", () => {
  test("debe de realizar el login", () => {
    const initialState = {};
    const action = {
      type: types.login,
      payload: {
        uid: "abc123",
        displayName: "Jorge",
      },
    };
    const state = authReducer(initialState, action);

    expect(state).toEqual({
      uid: "abc123",
      name: "Jorge",
    });
  });

  test("debe de realizar el logout", () => {
    const initialState = {
      uid: "1002002",
      name: "Jorge",
    };

    const action = { type: types.logout };

    const state = authReducer(initialState, action);

    expect(state).toEqual({});
  });

  test("no debe de hacer cambios en el state", () => {
    const initialState = {
      uid: "1002002",
      name: "Jorge",
    };

    const action = { type: "sddsds" };

    const state = authReducer(initialState, action);

    expect(state).toEqual(initialState);
  });
});
