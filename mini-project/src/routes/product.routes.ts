import { Router } from "express";

import {
  getAllProducts,
  getOneProduct,
  addProduct,
  editProduct,
  removeProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getOneProduct);

router.post("/", addProduct);
router.put("/:id", editProduct);
router.delete("/:id", removeProduct);

export default router;