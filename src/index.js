import React from "react";
import ReactDOM from "react-dom/client";

import JournalApp from "./JournalApp";
import "../src/styles/styles.scss";
import SidebarPro from "./components/journal/SidebarPro";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<JournalApp />);
