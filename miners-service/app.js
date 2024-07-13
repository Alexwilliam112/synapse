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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routing
app.use(router);
app.listen(PORT, () => {
  console.log("LOCALSERVER STARTED AT http://localhost:" + PORT);
});
