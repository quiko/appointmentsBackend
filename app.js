const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const appointmentsRouter = require("./routes/appointments");
const app = express();

// Allow use of env vars in .env file
require("dotenv/config");

//Middlwares
app.use(
  [
    cors(),
    process.env.NODE_ENV !== "test" && morgan("dev"),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true })
  ].filter(Boolean)
);

//disable caching
app.disable("etag");

//Routes
app.use("/appointments", appointmentsRouter);

module.exports = app;
