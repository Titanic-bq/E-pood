import { Product } from "./constructors/product.js";
import { Cart } from "./constructors/cart.js";
import { displayCartView } from "./views/cartView.js";
import { displayFavoriteProductsView } from "./views/favoritesView.js";
import { displayProductDetailView } from "./views/productDetailView.js";
import { displayAllProductsView } from "./views/allProductsView.js";
import { getProductsDataFromJson } from "./api.js";
const products = [
  new Product(1, "Sülearvuti", 45.99, "Elektroonika"),
  new Product(2, "Hiirepadi", 5.99, "Elektroonika"),
  new Product(3, "Kohvimasin", 89.99, "Köök"),
  new Product(4, "Raamat: JavaScript", 15.49, "Raamatud"),
  new Product(5, "Jalgratas", 120.0, "Sport"),
  new Product(6, "T-särk", 9.99, "Riided"),
  new Product(7, "Kõrvaklapid", 25.0, "Elektroonika"),
];

const cart = new Cart();
cart.addProduct(products[0], 2);
cart.addProduct(products[2], 1);

const initApp = async () => {
  const homeButton = document.getElementById("home-button");
  homeButton.onclick = () => initApp();

  const favoritesButton = document.getElementById("favorites-button");
  favoritesButton.onclick = () => displayFavoriteProductsView();

  const cartButton = document.getElementById("cart-button");
  cartButton.onclick = () => displayCartView(cart);

  const allProducts = await getProductsDataFromJson();
  displayAllProductsView(allProducts);
};

document.addEventListener("DOMContentLoaded", initApp);
