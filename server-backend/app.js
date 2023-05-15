require("dotenv").config();
require("express-async-errors");

// express
const express = require("express");
const app = express();

// database
const connectDB = require("./database/connect");

// rest of packages
const morgan = require("morgan");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");

// routers
const productRouter = require("./routes/productRoutes");

// middlewares
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

// security packages and loggers
// app.set("trust proxy");
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000,
//     max: 60,
//   })
// );
// app.use(helmet());
// app.use(xss());

app.use(cors());
app.use(morgan("tiny"));
// access data from body
app.use(express.json());

// route middlewares
app.get("/", (req, res) => {
  res.send({ message: "Hey, You are in correct path" });
});

app.use("/api/products", productRouter);

// middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 7777;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("CONNECTED to DB...");
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
