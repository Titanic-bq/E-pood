import { customreConstructor } from "../constructors/Customer.js";
export const displayFavoriteProductsView = () => {
  const favorites = customreConstructor.getAllFavorites();
  const container = document.getElementById("main-container");
  container.innerHTML = "<h2>Lemmiktooted</h2>";

  favorites.forEach((item) => {
    const favoriteItemElement = document.createElement("div");
    favoriteItemElement.classList.add("favorite-item");
    favoriteItemElement.innerHTML = `
        <h3>${item.product.name}</h3>
        <p>Hind: €${item.product.price}</p>
        <p>Kategooria: ${item.product.category}</p>
        <button class="remove-favorite" data-id="${item.product.id}">Eemalda lemmikutest</button>
        `;

    container.appendChild(favoriteItemElement);
  });
};
