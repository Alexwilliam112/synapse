if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routers/index");

const PORT = process.env.PORT || 3005

//config
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '500mb' }));
app.use(express.json({ limit: '500mb' }));

//routing
app.use(router);
app.listen(PORT, () => {
  console.log("Server is running on port : ", `http://localhost:${PORT}/`)
});
