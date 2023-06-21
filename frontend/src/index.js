import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StudentContextProvider } from "./context/studentContext";
import { UserContextProvider } from "./context/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <StudentContextProvider>
          <App />
        </StudentContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
