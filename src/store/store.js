import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { notesReducer } from "../reducers/notesReducer";
import { sideBarReducer } from "../reducers/sidebarReducer";
import { uiReducer } from "../reducers/uiReducer";
const reducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  notes: notesReducer,
  sidebar: sideBarReducer,
});

export const store = configureStore({ reducer }, applyMiddleware(thunk));
