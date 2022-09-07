import { types } from "../types/types";

export const toggleSidebar = (value) => {
  return {
    type: types.sidebarToggle,
    payload: value,
  };
};
