import { cartConstructor } from "../constructors/cart.js";
import { navigate } from "../router.js";
import { updateCartCount } from "../api.js";

export const displayProductDetailView = async (id) => {
  const container = document.getElementById("detailed-view");

  const response = await fetch("../data/products.json");
  const products = await response.json();

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    container.innerHTML = "<p>Toodet ei leitud</p>";
    return;
  }

  const favorites = {
    get() {
      return JSON.parse(localStorage.getItem("favorites")) || [];
    },
    save(list) {
      localStorage.setItem("favorites", JSON.stringify(list));
    },
    toggle(id) {
      const list = this.get();
      const index = list.indexOf(id);

      if (index === -1) list.push(id);
      else list.splice(index, 1);

      this.save(list);
    },
    isFavorite(id) {
      return this.get().includes(id);
    },
  };

  const productCard = document.createElement("div");
  productCard.classList.add("product");
  container.innerHTML = `<h1>${product.title}</h1>`;

  productCard.innerHTML = `
      <h2>${product.title}</h2>
      <img src="${product.image}" alt="${product.title}" width="150">
      <p>Kategooria: ${product.category}</p>
      <p>Hind: $${product.price}</p>
      <p>${product.description}</p>
      <p>ID: ${product.id}</p>
      <button id="fav-btn" class="favorites"></button>
      <button id="cart-nav">Lisa ostukorvi</button>
    `;

  container.append(productCard);

  const favBtn = document.getElementById("fav-btn");

  const updateFavButton = () => {
    if (favorites.isFavorite(product.id)) {
      favBtn.textContent = "Eemalda lemmikutest";
      favBtn.classList.add("active");
    } else {
      favBtn.textContent = "Lisa lemmikutesse";
      favBtn.classList.remove("active");
    }
  };

  updateFavButton();

  favBtn.addEventListener("click", () => {
    favorites.toggle(product.id);
    updateFavButton();
  });

  document.getElementById("cart-nav").addEventListener("click", () => {
    cartConstructor.addProduct(product);
    updateCartCount();
  });
};
