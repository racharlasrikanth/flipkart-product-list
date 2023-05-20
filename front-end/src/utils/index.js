// PRODUCT API URLS
const GET_ALL_PRODUCTS = process.env.REACT_APP_PRODUCTS_URL;
const ADD_PRODUCT_URL = process.env.REACT_APP_PRODUCTS_URL + "/add";

// Utility functions
const navigateToTop = (checkBehaviour = "smooth") => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: checkBehaviour,
  });
};

export { GET_ALL_PRODUCTS, ADD_PRODUCT_URL, navigateToTop };
