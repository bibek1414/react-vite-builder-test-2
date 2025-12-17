import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

function Header() {
  return (
    <header className="page-header">
      ...
    </header>
  );
}

// Define ProductPage, ProductsPage, State, ProductDetail, ProductGrid, etc.

function App({ initialData }) {
  return (
    <main className="page">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route
          path="/products"
          element={
            <ProductsPage
              initialProducts={initialData.products}
              initialError={initialData.page === "list" ? initialData.error : null}
            />
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProductPage
              initialProduct={initialData.page === "detail" ? initialData.product : null}
              initialError={initialData.page === "detail" ? initialData.error : null}
            />
          }
        />
        <Route
          path="*"
          element={
            <State
              title="Page not found."
              message="Try visiting /products or /products/1 for examples."
            />
          }
        />
      </Routes>
    </main>
  );
}

export default App;
