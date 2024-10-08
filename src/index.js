import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AppRouter from "./App.js";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
