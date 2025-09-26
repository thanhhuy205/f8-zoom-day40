import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";
import App from "./App.tsx";
import "./index.css";
import { Provider as ReduxProvider } from "./libs/react-redux.tsx";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </HashRouter>
  </StrictMode>
);
