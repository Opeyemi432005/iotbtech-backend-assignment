import type { Request, Response } from "express";
import {
  findAllProducts,
  findProductById,
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from "../services/product.service.js";

export function getAllProducts(req: Request, res: Response): void {
  const category = req.query.category as string | undefined;
  const products = findAllProducts(category);
  res.json(products);
}

export function getProductById(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const product = findProductById(id);

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(product);
}

export function createProduct(req: Request, res: Response): void {
  const { name, category, price, stock } = req.body;

  if (!name || price === undefined || typeof price !== "number") {
    res.status(400).json({ error: "name and price are required" });
    return;
  }

  const newProduct = createProductService({ name, category, price, stock });
  res.status(201).json(newProduct);
}

export function updateProduct(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const updatedProduct = updateProductService(id, req.body);

  if (!updatedProduct) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(updatedProduct);
}

export function deleteProduct(req: Request, res: Response): void {
  const id = Number(req.params.id);
  const success = deleteProductService(id);

  if (!success) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json({ deleted: true, id });
}