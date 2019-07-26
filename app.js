const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const appointmentsRouter = require("./routes/appointments");
const app = express();

// Allow use of env vars in .env file
require("dotenv/config");

//Middlwares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//disable caching
app.disable("etag");

//Routes
app.use("/appointments", appointmentsRouter);

module.exports = app;
