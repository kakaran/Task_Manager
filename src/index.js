import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {AllProvider} from "./Context/Context"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AllProvider>
    <App />
  </AllProvider>
  // </React.StrictMode>
);
