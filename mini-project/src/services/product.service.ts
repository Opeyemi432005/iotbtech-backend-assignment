import { readFileSync } from "node:fs";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const products: Product[] = [];

const csv = readFileSync("data/products.csv", "utf-8");

const lines = csv.trim().split("\n");

for (let i = 1; i < lines.length; i++) {
  const [id, name, category, price, stock] = lines[i].split(",");

  products.push({
    id: Number(id),
    name,
    category,
    price: Number(price),
    stock: Number(stock),
  });
}

let nextId =
  products.length > 0
    ? Math.max(...products.map((product) => product.id)) + 1
    : 1;

export function getProducts(): Product[] {
  return products;
}

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id);
}

export function createProduct(
  name: string,
  category: string,
  price: number,
  stock: number
): Product {
  const product: Product = {
    id: nextId++,
    name,
    category,
    price,
    stock,
  };

  products.push(product);

  return product;
}

export function updateProduct(
  id: number,
  name: string,
  category: string,
  price: number,
  stock: number
): Product | undefined {
  const product = getProductById(id);

  if (!product) {
    return undefined;
  }

  product.name = name;
  product.category = category;
  product.price = price;
  product.stock = stock;

  return product;
}

export function deleteProduct(id: number): Product | undefined {
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return undefined;
  }

  const deletedProduct = products[index];

  products.splice(index, 1);

  return deletedProduct;
}