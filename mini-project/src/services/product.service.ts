import fs from "node:fs";
import path from "node:path";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

function loadProducts(): Product[] {
  const filePath = path.resolve("data/products.csv");
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const lines = fileContent.split("\n").filter((line) => line.trim().length > 0);

  // Skip header line (id,name,category,price,stock)
  const dataLines = lines.slice(1);

  return dataLines.map((line, index) => {
    const [, name, category, price, stock] = line.split(",");
    return {
      id: index + 1,
      name: name?.trim() ?? "",
      category: category?.trim() ?? "",
      price: Number(price) || 0,
      stock: Number(stock) || 0,
    };
  });
}

let products: Product[] = loadProducts();
let nextId = products.length + 1;

export function findAllProducts(category?: string): Product[] {
  if (category) {
    return products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }
  return products;
}

export function findProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export function createProduct(data: Omit<Product, "id">): Product {
  const newProduct: Product = {
    id: nextId++,
    name: data.name,
    category: data.category ?? "general",
    price: data.price,
    stock: data.stock ?? 0,
  };
  products.push(newProduct);
  return newProduct;
}

export function updateProduct(
  id: number,
  data: Partial<Omit<Product, "id">>
): Product | null {
  const product = products.find((p) => p.id === id);
  if (!product) return null;

  Object.assign(product, data);
  return product;
}

export function deleteProduct(id: number): boolean {
  const initialLength = products.length;
  products = products.filter((p) => p.id !== id);
  return products.length < initialLength;
}