import { cartConstructor } from "../constructors/cart.js";

export const displayCartView = () => {
  const container = document.getElementById("cart-view");
  container.innerHTML = "<h2>Ostukorv</h2>";

  const cart = cartConstructor.getAllProducts();

  if (!cart.length) {
    const emptyMessage = document.createElement("p");
    emptyMessage.innerText = "Ostukorv on tühi";
    container.append(emptyMessage);
    return;
  }

  const productsContainer = document.createElement("div");
  productsContainer.classList.add("products-container");

  cart.forEach((item) => {
    const product = item.product;
    const quantity = item.quantity;

    const priceWithVAT = product.price;
    const priceWithoutVAT = (priceWithVAT / 1.2).toFixed(2);
    const vatAmount = (priceWithVAT - priceWithoutVAT).toFixed(2);

    const card = document.createElement("div");
    card.classList.add("product");

    card.innerHTML = `
      <h3>${product.title}</h3>
      <img src="${product.image}" alt="${product.title}" class="product-image">

      <p>Kogus: ${quantity}</p>

      <p>Hind ilma KM-ta: $${priceWithoutVAT}</p>
      <p>Käibemaks (20%): $${vatAmount}</p>
      <p>Hind koos KM-ga: $${priceWithVAT}</p>
    `;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Eemalda üks";

    removeButton.addEventListener("click", () => {
      cartConstructor.removeProduct(product.id);
      displayCartView();
    });

    card.appendChild(removeButton);
    productsContainer.appendChild(card);
  });

  container.append(productsContainer);

  const actions = document.createElement("div");
  actions.classList.add("cart-actions");

  const buyButton = document.createElement("button");
  buyButton.textContent = "Osta";

  buyButton.addEventListener("click", () => {
    alert("Tellimus kinnitatud! Aitäh ostu eest.");
    localStorage.removeItem("cart");
    cartConstructor.items = [];
    displayCartView();
  });

  const clearButton = document.createElement("button");
  clearButton.textContent = "Tühista ostukorv";

  clearButton.addEventListener("click", () => {
    if (confirm("Kas oled kindel, et soovid ostukorvi tühjendada?")) {
      localStorage.removeItem("cart");
      cartConstructor.items = [];
      displayCartView();
    }
  });

  actions.appendChild(buyButton);
  actions.appendChild(clearButton);
  container.append(actions);
};
