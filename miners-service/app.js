import express from "express";
import cors from "cors";

async function loadEnv() {
  if (process.env.NODE_ENV !== "production") {
    const dotenv = await import("dotenv");
    dotenv.config();
  }
}

async function startServer() {
  await loadEnv();
  
  const app = express();
  const router = await import("./routers/index.js");

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(router.default);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
