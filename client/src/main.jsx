import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { DeckContextProvider } from "./contexts/DeckContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <DeckContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </DeckContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
