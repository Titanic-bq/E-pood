import { Product } from "./constructors/product.js";
import { displayAllProductsView } from "./views/allProductsView.js";
import { getAllCategory } from "./api.js";
import { navigate } from "./router.js";

const initApp = async () => {
  const homeButton = document.getElementById("home-button");
  homeButton.onclick = () => navigate("allProducts");

  const favoritesButton = document.getElementById("favorites-button");
  favoritesButton.onclick = () => navigate("favorites");

  const cartButton = document.getElementById("cart-button");
  cartButton.onclick = () => navigate("cart");

  const categories = await getAllCategory();
  const categoryMenu = document.getElementById("categories");

  categories.forEach((category) => {
    const categoryElement = document.createElement("li");
    categoryElement.textContent = category;
    categoryElement.onclick = () => navigate("category", category);
    categoryMenu.appendChild(categoryElement);
  });
};

displayAllProductsView();

document.addEventListener("DOMContentLoaded", initApp);
