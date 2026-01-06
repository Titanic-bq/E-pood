import { Cart } from "./constructors/Cart.js";
import { Customer } from "./constructors/Customer.js";
import { fetchProducts } from "./data.js";
import { navigate } from "./router.js";

export const cart = new Cart();
export const customer = new Customer();
export let products = [];

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
