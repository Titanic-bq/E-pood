const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname)));

app.get("/api/products", (req, res) => {
  try {
    const data = fs.readFileSync("./data.json", "utf8");
    const products = JSON.parse(data);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to load products" });
  }
});
app.listen(8000, () => console.log("Server is running on port 8000"));
