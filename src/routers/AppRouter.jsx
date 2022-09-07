import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import JournalScreen from "../components/journal/JournalScreen";

import { auth } from "../firebase/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import LoginScreen from "../components/auth/LoginScreen";
import RegisterScreen from "../components/auth/RegisterScreen";
import AuthMain from "../components/auth/AuthMain";
import LoadingScreen from "../components/LoadingScreen";
import { login } from "../actions/auth";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import { startLoadingNotes } from "../actions/notes";

const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { notes } = useSelector((state) => state.notes);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        dispatch(startLoadingNotes(user.uid));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setChecking(false);
      }
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  useEffect(() => {
    if (notes) {
      setChecking(false);
    }
  }, [notes]);

  if (checking) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute
              isLoggedIn={isLoggedIn}
              element={<JournalScreen />}
              notes={!isLoggedIn ? [] : notes}
            />
          }
        />
        <Route
          path="auth"
          element={
            <PublicRoute isLoggedIn={isLoggedIn} element={<AuthMain />} />
          }
        >
          <Route index element={<Navigate to="login" />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
