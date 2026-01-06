import { Product } from "./constructors/product.js";
import { displayCartView } from "./views/cartView.js";
import { displayFavoritesView } from "./views/favoritesView.js";
import { displayProductsDetailView } from "./views/productDetailView.js";
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

cartConstructor.addproduct(products[0], 2);
cartConstructor.addproduct(products[2], 1);

const initApp = async () => {
  const homeButton = document.getElementById("home-button");
  hommebutton.onclick = () => initApp();

  const favoritesButton = document.getElementById("favorites-button");
  favoritesButton.onclick = () => navigate("favorites");

  const cartButton = document.getElementById("cart-button");
  cartButton.onclick = () => navigate("cart");

  const products = await getProductsDataFromJson();
  displayAllProductsView(products);
};

document.addEventListener("DOMContentLoaded", initApp);
