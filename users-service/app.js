const express = require("express");
const app = express();
const port = 3000;

app.set(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router)

app.listen(port, () => {
  console.log("Server is running at PORT", port);
});