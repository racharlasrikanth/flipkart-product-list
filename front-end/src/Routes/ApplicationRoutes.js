import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductsPage from "../pages/ProductsPage";
import SingleProductPage from "../pages/SingleProductPage";

function ApplicationRoutes() {
  return (
    <>
      <Routes>
        <Route element={<ProductsPage />} path="/products"></Route>
        <Route element={<SingleProductPage />} path="/products/:id"></Route>
      </Routes>
    </>
  );
}

export default ApplicationRoutes;
