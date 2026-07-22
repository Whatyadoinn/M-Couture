require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const app = express();
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

app.post("/api/products", async (req, res) => {
  const { title, description, price, comparePrice, collection, category, sku, sizes, images, inStock, featured } = req.body;
  const product = await prisma.product.create({
    data: { title, description, price, comparePrice, collection, category, sku, sizes, images, inStock, featured },
  });
  res.json(product);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    console.error("GET /api/products error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const { title, description, price, comparePrice, collection, category, sku, sizes, images, inStock, featured } = req.body;
    const product = await prisma.product.create({
      data: { title, description, price, comparePrice, collection, category, sku, sizes, images, inStock, featured },
    });
    res.json(product);
  } catch (err) {
    console.error("POST /api/products error:", err);
    res.status(500).json({ error: err.message });
  }
});