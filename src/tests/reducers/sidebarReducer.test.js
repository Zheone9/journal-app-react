import { sideBarReducer } from "../../reducers/sidebarReducer";
import { types } from "../../types/types";

describe("pruebas en el sidebar reducer", () => {
  test("debe de retornar true", () => {
    const initialState = { toggled: false };
    const action = {
      type: types.sidebarToggle,
      payload: true,
    };
    const state = sideBarReducer(initialState, action);
    console.log(state);
    expect(state).toEqual({
      toggled: true,
    });
  });

  test("debe de retornar falso", () => {
    const initialState = { toggled: true };
    const action = {
      type: types.sidebarToggle,
      payload: false,
    };
    const state = sideBarReducer(initialState, action);

    expect(state).toEqual({
      toggled: false,
    });
  });

  test("debe de retornar falso", () => {
    const initialState = { toggled: false };
    const action = {
      type: "sjsdjsdjsdjsd",
      payload: null,
    };
    const state = sideBarReducer(initialState, action);

    expect(state).toEqual({
      toggled: false,
    });
  });
});
