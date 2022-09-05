import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/styles.scss";
import JournalApp from "./JournalApp";

import TestViewHeight from "./components/TestViewHeight";
import LoginScreen from "./components/auth/LoginScreen";
import AuthMain from "./components/auth/AuthMain";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<JournalApp />);
