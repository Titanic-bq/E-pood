const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = 8000;
const DATA_FILE = path.join(__dirname, "data", "products.json");
const FAVORITES_FILE = path.join(__dirname, "data", "favorites.json");
const CART_FILE = path.join(__dirname, "data", "cart.json");

const app = express();
app.use(express.json());

// Allow Live Server (and any localhost origin) to call the API
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// Helper: read JSON file safely
const readJSON = (filePath, fallback = {}) => {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, "utf-8").trim();
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeJSON = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// --- Products ---
app.get("/api/products", (req, res) => {
  try {
    const data = readJSON(DATA_FILE, []);
    const { category } = req.query;
    if (category && category !== "all") {
      return res.json(data.filter((p) => p.category === category));
    }
    res.json(data);
  } catch {
    res.status(500).json({ message: "Andmete lugemine ebaõnnestus" });
  }
});

app.get("/api/products/:id", (req, res) => {
  const data = readJSON(DATA_FILE, []);
  const product = data.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Toodet ei leitud" });
  res.json(product);
});

// --- Categories ---
app.get("/api/categories", (req, res) => {
  try {
    const data = readJSON(DATA_FILE, []);
    const unique = ["all", ...new Set(data.map((p) => p.category))];
    res.json(unique);
  } catch {
    res.status(500).json({ message: "Kategooriate lugemine ebaõnnestus" });
  }
});

// --- Favorites ---
app.get("/api/favorites/:userID", (req, res) => {
  const favData = readJSON(FAVORITES_FILE, {});
  const ids = favData[req.params.userID] || [];
  const products = readJSON(DATA_FILE, []);
  res.json(products.filter((p) => ids.includes(p.id)));
});

app.post("/api/favorites/:userID/:productId", (req, res) => {
  const favData = readJSON(FAVORITES_FILE, {});
  const ids = favData[req.params.userID] || [];
  const newId = parseInt(req.params.productId);
  const unique = [...new Set([...ids, newId])];
  favData[req.params.userID] = unique;
  writeJSON(FAVORITES_FILE, favData);
  res.json(unique);
});

app.delete("/api/favorites/:userID/:productId", (req, res) => {
  const favData = readJSON(FAVORITES_FILE, {});
  const ids = favData[req.params.userID] || [];
  favData[req.params.userID] = ids.filter(
    (id) => id !== parseInt(req.params.productId)
  );
  writeJSON(FAVORITES_FILE, favData);
  res.json(favData[req.params.userID]);
});

// --- Cart (persisted per user) ---
app.get("/api/cart/:userID", (req, res) => {
  const cartData = readJSON(CART_FILE, {});
  res.json(cartData[req.params.userID] || []);
});

app.post("/api/cart/:userID", (req, res) => {
  const cartData = readJSON(CART_FILE, {});
  cartData[req.params.userID] = req.body;
  writeJSON(CART_FILE, cartData);
  res.json(cartData[req.params.userID]);
});

app.delete("/api/cart/:userID", (req, res) => {
  const cartData = readJSON(CART_FILE, {});
  cartData[req.params.userID] = [];
  writeJSON(CART_FILE, cartData);
  res.json([]);
});



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
