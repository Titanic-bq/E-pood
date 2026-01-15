import { customerCosntructor } from "../constructors/customer.js";

export const displayFavoriteProductsView = async () => {
  const favorites = customer.favorites;
  const container = document.getElementById("main-container");
  container.innerHTML = "<h2>Lemmiktooted</h2>";

  favorites.forEach((product) => {
    const favoriteItemElement = document.createElement("div");
    favoriteItemElement.classList.add("favorite-item");
    favoriteItemElement.innerHTML = `
        <h3>${product.title}</h3>
        <p>Hind: €${product.price}</p>
        <p>Kategooria: ${product.category}</p>
        <button class="remove-favorite" data-id="${product.id}">Eemalda lemmikutest</button>
        `;

    container.appendChild(favoriteItemElement);
  });
};
