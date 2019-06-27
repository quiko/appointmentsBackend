const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors =require('cors');
const keys = require("./config/keys");
const appointmentsRouter = require('./routes/appointments');
const app = express();


//Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(
  keys.mongodb.dbUrl,
  { useNewUrlParser: true, useCreateIndex: true },
  () => {
    console.log("connected to db");
  }
);

//Middlwares
app.use(cors())
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//disable caching
app.disable('etag');

//Routes
app.use('/appointments', appointmentsRouter);




//Start the server
const port = process.env.PORT || 8000;
app.listen(port);
console.log(`Server listening at ${port}`);
