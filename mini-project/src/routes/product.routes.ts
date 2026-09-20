import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { requireApiKey } from "../middleware/requireApiKey.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Protected routes (require x-api-key header)
router.post("/", requireApiKey, createProduct);
router.put("/:id", requireApiKey, updateProduct);
router.delete("/:id", requireApiKey, deleteProduct);

export default router;