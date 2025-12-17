import "./index.css";
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

declare global {
  interface Window {
    __INITIAL_DATA__?: any;
  }
}

const initialData = window.__INITIAL_DATA__ ?? {
  page: "list",
  products: [],
  product: null,
  error: null,
};

const rootElement = document.getElementById("root")!;

// In production, hydrate SSR content. In development, render fresh (CSR only)
if (import.meta.env.PROD && window.__INITIAL_DATA__) {
  hydrateRoot(
    rootElement,
    <StrictMode>
      <BrowserRouter>
        <App initialData={initialData} />
      </BrowserRouter>
    </StrictMode>
  );
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <App initialData={initialData} />
      </BrowserRouter>
    </StrictMode>
  );
}
