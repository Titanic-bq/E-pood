const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = 8000;
const DATA_FILE = path.join(__dirname, "data", "products.json");
const app = express();

app.use(express.static(path.join(__dirname)));

//Andmete haldus function
const fetchAndSaveProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    fs.writeFileSync(DATA_FILE, JSON.stringify(response.data, null, 2));
    console.log("Andmed uuendatud");
  } catch (error) {
    console.error("Viga andmete pärimisel:", error);
  }
};

//Kas fail on tühi, kontroll. function
const isFileEmpty = (file) => {
  try {
    const rawData = fs.readFileSync(FILE, "utf-8");
    return !rawData.trim();
  } catch (error) {
    console.error("Viga faili lugemises", error);
    return true;
  }
};

const emptyFile = isFileEmpty(DATA_FILE);

emptyFile && fetchAndSaveProducts();

app.use(express.static("public"));

// See on mõeldud kõigi toodete jaoks
app.get("/api/products", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    const category = req.query.category;
    if (category) {
      const filtered = data.filter((p) => p.category === category);
      return res.json(filtered);
    }
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: "Andmete lugemine ebaõnnestus" });
  }
});

//Üksik toode

app.get("/api/products/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  const product = data.find((p) => p.id === parseInt(req.params.id));

  if (!product) return res.status(404).send("Toodet ei leitud");
  res.json(product);
});

app.listen(PORT, () => console.log("Server is running on port 8000"));
wa;
