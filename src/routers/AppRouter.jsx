import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import JournalScreen from "../components/journal/JournalScreen";

import { auth } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import LoginScreen from "../components/auth/LoginScreen";
import RegisterScreen from "../components/auth/RegisterScreen";
import AuthMain from "../components/auth/AuthMain";
import { useLoading } from "../hooks/useLoading";
import LoadingScreen from "../components/LoadingScreen";
import { login } from "../actions/auth";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import TestViewHeight from "../components/TestViewHeight";

const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        setChecking(false);
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  // const isLoading = useLoading();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn} element={<JournalScreen />} />
          }
        />
        <Route
          path="auth"
          element={
            <PublicRoute isLoggedIn={isLoggedIn} element={<TestViewHeight />} />
          }
        >
          <Route index element={<Navigate to="login" />} />
          <Route path="login" element={<TestViewHeight />} />
          <Route path="register" element={<RegisterScreen />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
