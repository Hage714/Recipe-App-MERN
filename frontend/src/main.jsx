import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { MyRecipesProvider } from "./context/MyRecipesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MyRecipesProvider>
      <App />
    </MyRecipesProvider>
  </React.StrictMode>
);
