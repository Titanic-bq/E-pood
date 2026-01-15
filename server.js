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

app.get("/api/categories", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    const categories = data.map((item) => item.category);
    const uniqueArray = ["all", ...new Set(categories)];

    if (uniqueArray) {
      res.status(200).json(uniqueArray);
    } else {
      res.status(404).json({ message: "Kategooria lugemine ebaõnnestus" });
    }
  } catch (error) {
    res.status(404).json({ message: "Andmete lugemine ebaõnnestus" });
  }
});
// Endpoint
app.get("/api/favorites/:userID", (req, res) => {
  try {
    const isEmptyFavorites = isFileEmpty(favoritesFilePath);
    if (!isEmptyFavorites) {
      const favoritesData = JSON.parse(
        fs.readFileSync(favoritesFilePath, "utf-8")
      );

      console.log("fav", favoritesData);

      const favoritesIds = favoritesData[req.params.userID] || [];
      const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

      const products =
        data.filter((product) => favoritesIds.includes(product.id)) || [];

      res.status(200).json(products);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(404).json({ message: "Andmete lugemine ebaõnnestus" });
  }
});
// Endpoint favorite product ID
app.post("/api/favorites/:userID/:productId", (req, res) => {
  try {
    const emptyFile = isFileEmpty(favoritesFilePath);
    if (emptyFile) {
      //Valmistab objekti, millel on kliendi ID ja järjestus tootede id väärtustest
      const newData = {
        [req.params.userID]: [parseInt(req.params.productId)],
      };
      fs.writeFileSync(favoritesFilePath, JSON.stringify(newData, null, 2));
      return res.status(200).json(newData);
    }

    const favoritesData = JSON.parse(
      fs.readFileSync(favoritesFilePath, "utf-8")
    );

    //take the client favorite product id array from file
    const favoritesIds = favoritesData[req.params.userID] || [];

    //add id to the file array
    favoritesIds.push(parseInt(req.params.productId));
    const uniqueIds = [...new Set(favoritesIds)];
    favoritesData[req.params.userID] = uniqueIds;

    // write new array to file
    fs.writeFileSync(favoritesFilePath, JSON.stringify(favoritesData, null, 2));
    //See json, mis sa siin tagastad on näha ka veebilhitseja network tab'is
    res.status(200).json(uniqueIds);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Andmete kirjutamine lemmikutesse ebaõnnestus" });
  }
});
// Endpoint , mis kustutab lemmiku ID
app.delete("/api/favorites/:userID/:productId", async (req, res) => {
  try {
    const favoritesData = JSON.parse(
      await fs.readFile(favoritesFilePath, "utf-8")
    );
    //take the client favorite product id array from file
    const favoritesIds = favoritesData[req.params.userID] || [];
    //delete id from the file

    const newArray = favoritesIds.filter(
      (id) => id !== parseInt(req.params.productId)
    );
    favoritesData[req.params.userID] = newArray;
    // write new array to file
    await fs.writeFile(
      favoritesFilePath,
      JSON.stringify(favoritesData, null, 2)
    );

    res.status(200).json(favoritesData);
  } catch (error) {
    res.status(404).json({ message: "Andmete kirjutamine ebaõnnestus" });
  }
});

app.use(express.static(path.join(__dirname, "public")));

// 4. SPA ROUTING
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log("Server is running on port 8000"));
