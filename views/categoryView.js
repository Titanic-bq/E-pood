import { navigate } from "../router.js";
import { cartConstructor } from "../constructors/cart.js";

export const displayCategoryView = async (categoryName) => {
  console.log("CATEGORY VIEW KÄIVITUS:", categoryName);
  const container = document.getElementById("main-container");
  container.innerHTML = "";

  // --- Pealkiri ---
  const title = document.createElement("h2");
  title.textContent = `Kategooria: ${categoryName}`;
  container.appendChild(title);

  // --- Kategooriate riba (täpselt nagu AllProductsView-s) ---
  const categoryBar = document.createElement("div");
  categoryBar.classList.add("category-bar");
  container.appendChild(categoryBar);
  console.log("CATEGORY BAR LISATUD DOM-I");
  console.log("categoryBar:", categoryBar);
  console.log("container:", container);

  // Lae kõik tooted, et saada kategooriad
  let allProducts = [];
  try {
    const res = await fetch("/data/products.json");
    allProducts = await res.json();
  } catch (err) {
    console.error("Ei saanud laadida products.json", err);
  }

  const categories = [...new Set(allProducts.map((p) => p.category))];

  // "Kõik" nupp
  const allBtn = document.createElement("button");
  allBtn.textContent = "Kõik";
  allBtn.addEventListener("click", () => navigate("products"));
  categoryBar.appendChild(allBtn);

  // Kategooria nupud
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.textContent = cat;

    // märgi aktiivne kategooria
    if (cat === categoryName) {
      btn.classList.add("active-category");
    }

    btn.addEventListener("click", () => navigate("category", cat));

    categoryBar.appendChild(btn);
  });

  // --- Toodete konteiner ---
  const productsContainer = document.createElement("div");
  productsContainer.classList.add("products-container");
  container.appendChild(productsContainer);

  // --- Lae kategooria tooted backendist ---
  try {
    const response = await fetch(
      `/api/products/category/${encodeURIComponent(categoryName)}`,
    );
    const products = await response.json();

    if (!products.length) {
      productsContainer.innerHTML = `<p>Selles kategoorias pole tooteid.</p>`;
      return;
    }

    renderProducts(products);
  } catch (error) {
    productsContainer.innerHTML = `<p>Viga toodete laadimisel.</p>`;
    console.error("Category view error:", error);
  }

  // --- Render funktsioon ---
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
      card.addEventListener("click", () => navigate("product", product.id));

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
