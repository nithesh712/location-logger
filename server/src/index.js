const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const middlewares = require("./middlewares");
const logs = require("./api/logs");

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello From Here",
  });
});

//Routes from logs
app.use("/api/logs", logs);

//Error Handling Middlewares
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

//PORT
const port = process.env.PORT || 1337;

//Listening
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
