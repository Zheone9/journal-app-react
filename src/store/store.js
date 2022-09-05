import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { uiReducer } from "../reducers/uiReducer";

const reducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

export const store = configureStore({ reducer }, applyMiddleware(thunk));
