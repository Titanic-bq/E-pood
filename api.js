import { Product } from "./constructors/product.js";
import { navigate } from "./router.js";
import { cartConstructor } from "./constructors/cart.js";

// NAVIGEERIMINE OSTUKORVI
document.getElementById("cart-button").addEventListener("click", () => {
  navigate("cart");
});

// Aksli versioon
export async function getData() {
  try {
    let response = await fetch(`./data.json`);
    let data = await response.json();
    // console.log(data);
  } catch (error) {
    console.log("Error", error);
  }
}

export function updateCartCount() {
  const countElement = document.getElementById("cart-count");
  if (!countElement) return;

  const total = cartConstructor.totalItems;
  countElement.textContent = total > 0 ? `(${total})` : "";
}

updateCartCount();

cartConstructor.onChange(() => {
  updateCartCount();
});
