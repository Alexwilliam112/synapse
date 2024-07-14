if (process.env.NODE_ENV !== "production"){
  require('dotenv').config()
}

const express = require("express");
const router = require("./routers");
// const authentication = require('./middlewares/authentication');
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = 3003;
const cors = require("cors");

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(authentication)

app.use(router)

app.use(errorHandler)

app.listen(port, () => {
  console.log("Server is running at PORT", port);
});