import { types } from "../types/types";

const initialState = {
  toggled: false,
};

export const sideBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.sidebarToggle:
      return {
        toggled: action.payload,
      };
    default:
      return state;
  }
};
