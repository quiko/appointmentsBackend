const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

//Connect to database
mongoose
  .connect(process.env.MONGODB, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    // Start Server
    server.listen(PORT, () => {
      console.log("Database Status: Connected");
      console.log(`Server Running: http://localhost:${PORT}/`);
    });
  })
  .catch(error => console.dir(error));
