const Product = require("./../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("./../errors");

const getAllProducts = async (req, res) => {
  let allProducts = await Product.find({});

  res.status(StatusCodes.OK).json({
    count: allProducts.length,
    allProducts,
  });
};

const searchProducts = () => {
  return [];
};

const addProduct = async (req, res) => {
  let {
    brand = "",
    type = "",
    weight = "",
    name = "",
    price = 0,
    quantity = 0,
    image = "",
    listOfImages = [],
    modelName = "",
    maximumShelfLife = "",
    foodPrefernce = "",
    flavour = "",
    ingredients = "",
    nutrientContent = "",
    usageInstructions = "",
    featured = false,
  } = req.body;

  if (!brand || !type || !name) {
    throw new CustomError.BadRequestError(
      "Please provide ProductName, Category, Price, Stock"
    );
  }

  const product = await Product.create({
    brand,
    type,
    weight,
    name,
    price,
    quantity,
    image,
    listOfImages,
    modelName,
    maximumShelfLife,
    foodPrefernce,
    flavour,
    ingredients,
    nutrientContent,
    usageInstructions,
    featured,
  });

  res.status(StatusCodes.CREATED).json({
    message: "Successfully Added",
    product,
  });
};

const getSingleProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });

  if (!product) {
    throw new CustomError.NotFoundError(
      `No product with id : ${req.params.id}`
    );
  }

  // check weather user having this route permission or not
  //   checkPermissions(req.user, user._id);

  // if all goes good (if requersted user having all permissons then proceed to send response)
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id, productName, image, category, description, price, stock } =
    req.body;

  if (!productName || !category || !price || !stock) {
    throw new CustomError.BadRequestError(
      "Please provide ProductName, Category, Price, Stock"
    );
  }

  const product = await Product.findOne({ _id: id });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id : ${id}`);
  }

  product.productName = productName;
  product.image = image;
  product.category = category;
  product.description = description;
  product.price = price;
  product.stock = stock;
  product.isAdminRejected = false;
  product.adminRejectRason = "";
  await product.save();

  // after changing the user information please update cookie and json web token
  // const tokenUserObj = createTokenUser(user);
  // attachCookiesToResponse({ res, tokenUserObj });
  res.status(StatusCodes.OK).json({ message: "Succesfylly Updated", product });
};

const deleteProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });

  if (!product) {
    throw new CustomError.NotFoundError(
      `No product with id : ${req.params.id}`
    );
  }

  await Product.findOneAndDelete({ _id: req.params.id });

  res
    .status(StatusCodes.OK)
    .json({ message: `successfully deleted product id : ${req.params.id}` });
};

module.exports = {
  getAllProducts,
  addProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
