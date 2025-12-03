import { Product } from "./constructors/Product.js";

import { displayAllProductsView } from "./constructors/Cart.js";

const products = [
  new Product(1, "Sülearvuti", 45.99, "Elektroonika"),
  new Product(2, "Hiirepadi", 5.99, "Elektroonika"),
  new Product(3, "Kohvimasin", 89.99, "Köök"),
  new Product(4, "Raamat: JavaScript", 15.49, "Raamatud"),
  new Product(5, "Jalgratas", 120.0, "Sport"),
];

const initApp = () => {
  displayAllProductsView(products);
};

document.addEventListener("DOMContentLoaded", initApp);
