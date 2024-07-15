if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}

const express = require("express");
const router = require("./routers");

const app = express();
const port = 3003;
const cors = require("cors");

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router)

app.listen(port, () => {
  console.log("Server is running on port : ", `http://localhost:${port}/`)
});