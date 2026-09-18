import { writeFileSync } from "node:fs";

const ROWS = Number(process.env.ROWS ?? "10000");

const categories = [
  "electronics",
  "clothing",
  "books",
  "home",
  "toys",
  "food",
];

const lines = ["id,name,category,price,stock"];

for (let i = 1; i <= ROWS; i++) {
  const category = categories[(i - 1) % categories.length];
  const name = `${category}-${i}`;
  const price = ((i * 137) % 10000) / 100;
  const stock = (i * 7) % 500;

  lines.push(
    `${i},${name},${category},${price.toFixed(2)},${stock}`
  );
}

writeFileSync("data/products.csv", lines.join("\n"));

console.log(`Generated ${ROWS} rows -> data/products.csv`);