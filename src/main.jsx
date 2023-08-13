import React from "react";
import ReactDOM from "react-dom/client";
import { ReduxProvider } from "./redux/provider";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { persistor } from "./redux/store"; // Importing  Redux store
import App from "./App.jsx";
import "./index.css";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>
);
