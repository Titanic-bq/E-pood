import { navigate } from "../router.js";
import { cartConstructor } from "../constructors/cart.js";

export const displayFavoritesView = async () => {
  const container = document.getElementById("main-container");
  container.innerHTML = "<h2>Lemmikud</h2>";

  const favorites = (JSON.parse(localStorage.getItem("favorites")) || []).map(
    Number,
  );
  //console.log("Lemmikud localStoragest:", favorites);

  if (favorites.length === 0) {
    container.innerHTML += "<p>Sul pole veel lemmikuid.</p>";
    return;
  }

  const response = await fetch("../data/products.json");
  const productsData = await response.json();
  console.log("Laetud tooted:", productsData);

  const favoriteProducts = productsData.filter((p) =>
    favorites.includes(Number(p.id)),
  );
  console.log("Filtreeritud lemmikud:", favoriteProducts);

  if (favoriteProducts.length === 0) {
    container.innerHTML += "<p>Lemmikuid ei leitud (ID mismatch).</p>";
    return;
  }

  const productsContainer = document.createElement("div");
  productsContainer.classList.add("products-container");

  favoriteProducts.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product");

    card.innerHTML = `
      <h3>${product.title}</h3>
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <p>Kategooria: ${product.category}</p>
      <p>Hind: $${product.price}</p>
    `;

    card.addEventListener("click", () => {
      navigate("product", product.id);
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Eemalda lemmikutest";
    removeBtn.classList.add("favorites", "active");

    removeBtn.addEventListener("click", (event) => {
      event.stopPropagation();

      const updated = favorites.filter((id) => id !== Number(product.id));
      localStorage.setItem("favorites", JSON.stringify(updated));

      displayFavoritesView();
    });

    const cartButton = document.createElement("button");
    cartButton.textContent = "Lisa ostukorvi";

    cartButton.addEventListener("click", (event) => {
      event.stopPropagation();
      cartConstructor.addProduct(product);
    });

    card.appendChild(removeBtn);
    card.appendChild(cartButton);

    productsContainer.appendChild(card);
  });

  container.appendChild(productsContainer);
};
