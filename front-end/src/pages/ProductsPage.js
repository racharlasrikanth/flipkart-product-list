import React, { useEffect, useState } from "react";
import ProductsList from "../containers/ProductsList";
import { GET_ALL_PRODUCTS } from "./../utils";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({ status: false, message: "" });

  const fetchProducts = async (comingUrl) => {
    setIsLoading(true);
    setIsError({ status: false, message: "" });
    const options = {
      method: "POST",
      body: JSON.stringify({
        searchKey: searchKey,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(comingUrl, options);
      const { allProducts } = await response.json();
      setProducts([...allProducts]);
      setIsLoading(false);
      setIsError({ status: false, message: "" });
    } catch (error) {
      setIsLoading(false);
      setIsError({
        status: true,
        message: error.message || "Something went wrong...",
      });
    }
  };
  useEffect(() => {
    fetchProducts(`${GET_ALL_PRODUCTS}/searchProducts`);
  }, [searchKey]);

  return (
    <main className="main-container paddingBottomDesktop-hundred paddingTopDesktop-hundred paddingBottomMobile-fifty paddingTopMobile-fifty">
      <div className="main-content wrapper">
        <div className="search-container paddingBottomDesktop-thirty paddingBottomMobile-twenty">
          <input
            type="text"
            className="primary-input full-width-mobile full-width-desktop"
            placeholder="Search for a Product"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </div>
        <ProductsList data={products} isLoading={isLoading} />
      </div>
    </main>
  );
}

export default ProductsPage;
