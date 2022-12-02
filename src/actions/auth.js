import Swal from "sweetalert2";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  auth,
  createUserWithEmailAndPassword,
  googleAuthProvider,
  signInWithPopup,
} from "../firebase/firebase-config";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
import { notesLogout } from "./notes";

export const startLoginEmailPassword = (email, password) => {
  return async (dispatch) => {
    dispatch(startLoading());
    return signInWithEmailAndPassword(auth, email, password)
      .then(({ user: { uid, displayName } }) => {
        dispatch(login(uid, displayName));
        dispatch(finishLoading());
      })
      .catch((e) => {
        dispatch(finishLoading());
        Swal.fire("Error", "Invalid password/email", "error");
      });
  };
};

export const startRegisterWithEmailAndPasswordName = (
  email,
  password,
  name
) => {
  return async (dispatch) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user: { uid } }) => {
        await updateProfile(auth.currentUser, { displayName: name });
        dispatch(login(uid, auth.currentUser.displayName));
      })
      .catch((e) => {
        Swal.fire("Error", "Email already in use", "error");
        return false;
      });
  };
};

//Get the uid and username of the user when logged in
export const startGoogleLogin = () => {
  return (dispatch) => {
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user: { uid, displayName } }) =>
        dispatch(login(uid, displayName))
      )
      .catch((e) => {
        console.log(e);
      });
  };
};

export const login = (uid, displayName) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
    },
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await auth.signOut();
    dispatch(logout());
    dispatch(notesLogout());
  };
};

export const logout = () => {
  return {
    type: types.logout,
  };
};
