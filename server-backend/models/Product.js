const mongoose = require("mongoose");
const validator = require("validator");

const ProductSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: [true, "Please provide product name"],
      minlength: 3,
      maxlength: 100,
    },
    type: {
      type: String,
      required: [true, "Please provide category"],
    },
    weight: {
      type: String,
    },
    name: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide price"],
    },
    image: {
      type: String,
      default: "/images/default-img.jpeg",
    },
    listOfImages: {
      type: Array,
      default: [],
    },
    modelName: {
      type: String,
    },
    maximumShelfLife: {
      type: String,
    },
    foodPrefernce: {
      type: String,
    },
    flavour: {
      type: String,
    },
    ingredients: {
      type: String,
    },
    nutrientContent: {
      type: String,
    },
    usageInstructions: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
