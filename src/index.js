import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CardsProvider } from "./context/CardsContext";
import { CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CardsProvider>
      <CssBaseline />
      <App />
    </CardsProvider>
  </React.StrictMode>
);
