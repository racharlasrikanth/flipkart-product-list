const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  addProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require("../controllers/productController");

router.route("/").get(getAllProducts);
router.route("/add").post(addProduct);
router.route("/updateProduct").patch(updateProduct);
router.route("/searchProducts").post(searchProducts);
router.route("/:id").delete(deleteProduct);
router.route("/:id").get(getSingleProduct);

module.exports = router;
