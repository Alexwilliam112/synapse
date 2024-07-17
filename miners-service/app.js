if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const router = require("./routers/index");

const app = express();

const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '500mb' }));
app.use(express.json({ limit: '500mb' }));

app.use(router);

app.listen(PORT, () => {
  console.log("Server is running on port: ", `http://localhost:${PORT}/`);
});
