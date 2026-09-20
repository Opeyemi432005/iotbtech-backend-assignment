import express from "express";
import productRouter from "./routes/product.routes.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// 1st: Request logger
app.use(requestLogger);

// 2nd: Body parser
app.use(express.json());

// 3rd: Routes
app.use("/api/products", productRouter);

// Test route to prove error handling works
app.get("/boom", (_req, _res) => {
  throw new Error("Kaboom!");
});

// 4th: 404 handler (runs if no route matches)
app.use(notFoundHandler);

// LAST: Global error handler (runs if anything throws)
app.use(errorHandler);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
});