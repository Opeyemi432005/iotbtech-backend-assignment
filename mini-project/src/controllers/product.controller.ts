import { Request, Response, NextFunction } from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/product.service.js";

export function getAllProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products = getProducts();

    res.json(products);
  } catch (error) {
    next(error);
  }
}

export function getOneProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const product = getProductById(id);

    if (!product) {
      res.status(404).json({
        error: "Product not found",
      });
      return;
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
}

export function addProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, category, price, stock } = req.body;

    const product = createProduct(
      name,
      category,
      Number(price),
      Number(stock)
    );

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

export function editProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const { name, category, price, stock } = req.body;

    const product = updateProduct(
      id,
      name,
      category,
      Number(price),
      Number(stock)
    );

    if (!product) {
      res.status(404).json({
        error: "Product not found",
      });
      return;
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
}

export function removeProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    const product = deleteProduct(id);

    if (!product) {
      res.status(404).json({
        error: "Product not found",
      });
      return;
    }

    res.json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
}