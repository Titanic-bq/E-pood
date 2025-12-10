import { Product } from "./constructors/product.js";
import { cartConstructor } from "./constructors/cart.js";
import { displayCartView } from "./views/cartView.js";
import { displayFavoritesView } from "./views/favoritesView.js";
import { displayProductsDetailView } from "./views/productDetailView.js";
import { displayAllProductsView } from "./views/allProductsView.js";

const products = [
  new Product(1, "Sülearvuti", 45.99, "Elektroonika"),
  new Product(2, "Hiirepadi", 5.99, "Elektroonika"),
  new Product(3, "Kohvimasin", 89.99, "Köök"),
  new Product(4, "Raamat: JavaScript", 15.49, "Raamatud"),
  new Product(5, "Jalgratas", 120.0, "Sport"),
];

cartConstructor.addproduct(products[0], 2);
cartConstructor.addproduct(products[2], 1);

const initApp = async () => {
  displayAllProductsView(products);
  displayProductsDetailView(products[1]);
  displayCartView();
  displayFavoritesView();
};

document.addEventListener("DOMContentLoaded", initApp);
