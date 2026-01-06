import { Product } from "./constructors/product.js";
import { Cart } from "./constructors/Cart.js";
import { Customer } from "./constructors/Customer.js";
import { fetchProducts } from "./data.js";
import { navigate } from "./router.js";

const products = [
  new Product(1, "Sülearvuti", 45.99, "Elektroonika"),
  new Product(2, "Hiirepadi", 5.99, "Elektroonika"),
  new Product(3, "Kohvimasin", 89.99, "Köök"),
  new Product(4, "Raamat: JavaScript", 15.49, "Raamatud"),
  new Product(5, "Jalgratas", 120.0, "Sport"),
  new Product(6, "T-särk", 9.99, "Riided"),
  new Product(7, "Kõrvaklapid", 25.0, "Elektroonika"),
];

export const customer = new Customer();

const cartConstructor = new Cart();
cartConstructor.addproduct(products[0], 2);
cartConstructor.addproduct(products[2], 1);

const initApp = async () => {
  const homeButton = document.getElementById("home-button");
  hommebutton.onclick = () => initApp();

  const favoritesButton = document.getElementById("favorites-button");
  favoritesButton.onclick = () => navigate("favorites");

  const cartButton = document.getElementById("cart-button");
  cartButton.onclick = () => navigate("cart");

  const products = await fetchProducts();
  displayAllProductsView(products);
};

document.addEventListener("DOMContentLoaded", initApp);
