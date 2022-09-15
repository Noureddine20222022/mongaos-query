require("dotenv").config();
require("express-async-errors");
const express = require("express");
const postrouter = require("./routes/postRoute");
const connectDB = require("./shared/dbconfig");
const app = express();
const port = process.env.PORT || 4000;
const notFound = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/error-handler");
app.use(express.json());
app.use('/api/v1/post',postrouter)



app.use(notFound)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`connected http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
