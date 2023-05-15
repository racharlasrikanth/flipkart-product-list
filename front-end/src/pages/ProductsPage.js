import React from "react";
import ProductsList from "../containers/ProductsList";

function ProductsPage() {
  const rows = [
    {
      name: "Maggi",
      desc: "Maggi with 2 packs",
      weight: "200g",
      price: 250,
      quantity: 10,
      image: "",
    },
    {
      name: "Maggi",
      desc: "Maggi with 4 packs",
      weight: "500g",
      price: 550,
      quantity: 20,
      image: "",
    },
    {
      name: "Lays",
      desc: "Lays with red color",
      weight: "100g",
      price: 10,
      quantity: 50,
      image: "",
    },
    {
      name: "Lays",
      desc: "Maggi with blue color",
      weight: "100g",
      price: 10,
      quantity: 60,
      image: "",
    },
  ];

  return (
    <main className="main-container">
      <div className="main-content wrapper">
        <div className="search-container">
          <input
            type="text"
            className="primary-input full-width-mobile full-width-desktop"
            placeholder="Search for a Product"
          />
        </div>
        <ProductsList data={rows} />
      </div>
    </main>
  );
}

export default ProductsPage;
