const express = require("express");
const fs = require("fs/promises");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 8000;

// Serveeri staatilised failid
app.use(express.static(__dirname));

// Fail, kuhu tooted salvestatakse
const productsFile = "./data/products.json";

// Lae FakeStore API andmed ja salvesta faili
const fetchAndSaveProducts = async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  const products = response.data;
  await fs.writeFile(productsFile, JSON.stringify(products, null, 2));
};

// Kontrolli, kas fail on tühi
const isFileEmpty = async (path) => {
  try {
    const rawData = await fs.readFile(path, "utf-8");
    return !rawData.trim();
  } catch {
    return true;
  }
};

// ---------------- API ROUTES ---------------- //

// Kõik tooted
app.get("/api/products", async (req, res) => {
  try {
    const empty = await isFileEmpty(productsFile);
    if (empty) await fetchAndSaveProducts();

    const raw = await fs.readFile(productsFile, "utf-8");
    const products = JSON.parse(raw);

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Toodete lugemine ebaõnnestus" });
  }
});

// Üks toode ID järgi
app.get("/api/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const raw = await fs.readFile(productsFile, "utf-8");
    const products = JSON.parse(raw);

    const product = products.find((p) => p.id === id);

    if (!product) return res.status(404).json({ error: "Toodet ei leitud" });

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Toote lugemine ebaõnnestus" });
  }
});

// Kategooriate loend
app.get("/api/categories", async (req, res) => {
  try {
    const raw = await fs.readFile(productsFile, "utf-8");
    const products = JSON.parse(raw);

    const categories = [...new Set(products.map((p) => p.category))];

    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kategooriate lugemine ebaõnnestus" });
  }
});

// Tooted kategooria järgi
app.get("/api/products/category/:name", async (req, res) => {
  try {
    const category = decodeURIComponent(req.params.name).toLowerCase();

    const raw = await fs.readFile(productsFile, "utf-8");
    const products = JSON.parse(raw);

    const filtered = products.filter(
      (p) => p.category.toLowerCase() === category,
    );

    res.json(filtered);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kategooria toodete lugemine ebaõnnestus" });
  }
});

// Käsitsi uuesti laadimine
app.get("/api/fetch-products", async (req, res) => {
  try {
    await fetchAndSaveProducts();
    res.json({ message: "Andmed uuendatud" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Andmete laadimine ebaõnnestus" });
  }
});

// ---------------- SPA ROUTES ---------------- //

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// SPA fallback – kõik tundmatud teed saadavad index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ---------------- START SERVER ---------------- //

app.listen(PORT, () => console.log(`Server töötab: http://localhost:${PORT}`));
