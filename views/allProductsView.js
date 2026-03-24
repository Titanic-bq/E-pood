import { navigate } from "../router.js";
import { cartConstructor } from "../constructors/cart.js";

export const displayAllProductsView = async () => {
  const container = document.getElementById("main-container");

  // Puhasta vaade
  container.innerHTML = "";

  // Pealkiri
  const title = document.createElement("h2");
  title.id = "products-title";
  title.textContent = "Kõik tooted";
  container.appendChild(title);

  // Lae tooted failist
  const response = await fetch("/data/products.json");
  const products = await response.json();

  // --- Kategooriate riba ---
  const categoryBar = document.createElement("div");
  categoryBar.classList.add("category-bar");

  // "Kõik" nupp
  const allBtn = document.createElement("button");
  allBtn.textContent = "Kõik";
  allBtn.addEventListener("click", () => {
    navigate("products");
  });
  categoryBar.appendChild(allBtn);

  // Leia kategooriad
  const categories = [...new Set(products.map((p) => p.category))];

  // Kategooria nupud
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat;

    btn.addEventListener("click", () => {
      navigate("category", cat); // ⭐ oluline!
    });

    categoryBar.appendChild(btn);
  });

  container.appendChild(categoryBar);

  // --- Toodete konteiner ---
  const productsContainer = document.createElement("div");
  productsContainer.classList.add("products-container");
  container.appendChild(productsContainer);

  // --- Renderda kõik tooted ---
  renderProducts(products);

  function renderProducts(list) {
    productsContainer.innerHTML = "";

    list.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product");

      card.innerHTML = `
        <h3>${product.title}</h3>
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <p>Kategooria: ${product.category}</p>
        <p>Hind: $${product.price}</p>
      `;

      // Ava detailvaade
      card.addEventListener("click", () => {
        navigate("product", product.id);
      });

      // --- Lemmikute nupp ---
      const favBtn = document.createElement("button");
      favBtn.textContent = "Lisa lemmikutesse";
      favBtn.classList.add("favorites");

      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (favorites.includes(product.id)) {
        favBtn.textContent = "Eemalda lemmikutest";
        favBtn.classList.add("active");
      }

      favBtn.addEventListener("click", (event) => {
        event.stopPropagation();

        let favs = JSON.parse(localStorage.getItem("favorites")) || [];

        if (favs.includes(product.id)) {
          favs = favs.filter((id) => id !== product.id);
        } else {
          favs.push(product.id);
        }

        localStorage.setItem("favorites", JSON.stringify(favs));
        renderProducts(list); // uuenda nuppude olekut
      });

      // --- Lisa ostukorvi nupp ---
      const cartBtn = document.createElement("button");
      cartBtn.textContent = "Lisa ostukorvi";

      cartBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        cartConstructor.addProduct(product);
      });

      // Lisa nupud kaardile
      card.appendChild(favBtn);
      card.appendChild(cartBtn);

      productsContainer.appendChild(card);
    });
  }
};
