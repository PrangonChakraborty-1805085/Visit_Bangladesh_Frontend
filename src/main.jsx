import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReactNotifications />
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
