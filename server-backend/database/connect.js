const mongoose = require("mongoose");

const connectDB = (url) => {
  console.log("Connecting to DB...");
  mongoose.set("strictQuery", false);
  return mongoose.connect(url);
};

module.exports = connectDB;
