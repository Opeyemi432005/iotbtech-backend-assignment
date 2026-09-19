import express from "express";
import productRouter from "./routes/product.routes.js";

const app = express();

app.use(express.json());

app.use("/api/products", productRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});