import { navigate } from "../router";
import { customerCunstroctor } from "../constructors/customer.js";
import { getProductsDatabyCategory } from "../api.js";

export const displayAllProductsView = (products) => {
  const container = document.getElementById("main-container");

  container.innerHTML = "<h2>Tooted</h2>";

  const productsContainer = document.createElement("div");
  productsContainer.classList.add("products-container");

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product");
    productCard.innerHTML = `
            <h3>${product.title}</h3>
            <p>Hind: €${product.price}</p>
            <p>Kategooria: ${product.category}</p>
            <button id="favorites-${product.id}" class="favorites">${
      customerConstructor.isFavorite(product.id)
        ? "Eemalda lemmikutest"
        : "Lisa lemmikutesse"
    }</button>
        `;

    const cartButton = document.createElement("button");
    cartButton.textContent = "Lisa ostukorvi";
    cartButton.onclick = (e) => {
      e.stopPropagation();
      cartConstructor.addProduct(product);
    };

    container.append(productsContainer);
  });
};
