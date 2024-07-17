if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}

const express = require("express");
const router = require("./routers");

const app = express();
const port = process.env.PORT || 3003;
const cors = require("cors");

app.use(cors())
app.use(express.urlencoded({ extended: true, limit: '500mb' }));
app.use(express.json({ limit: '500mb' }));

app.use(router)

app.listen(port, () => {
  console.log("Server is running on port : ", `http://localhost:${port}/`)
});