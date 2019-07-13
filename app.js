const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const appointmentsRouter = require("./routes/appointments");
const app = express();

// Allow use of env vars in .env file
require("dotenv/config");

//Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB,
  { useNewUrlParser: true, useCreateIndex: true },
  () => {
    console.log("connected to db");
  }
);

//Middlwares
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//disable caching
app.disable("etag");

//Routes
app.use("/appointments", appointmentsRouter);

//Start the server
const port = process.env.PORT || 8000;
app.listen(port);
console.log(`Server listening at ${port}`);
