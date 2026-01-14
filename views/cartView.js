export const displayCartView = (cartParam) => {
  const container = document.getElementById("cart-view");
  container.innerHTML = "<h2>Ostukorv</h2>";

  const cart = cartParam.items;

  if (!cart.length) {
    const cartItemElement = document.createElement("p");
    cartItemElement.textContent = "Ostukorv on tühi";
    container.append(cartItemElement);
  } else {
    cart.forEach((item) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("cart-item");
      cartItemElement.innerHTML = `
                <h3>${item.product.title}</h3>
                <p>Kogus: ${item.quantity}</p>
                <p>Hind: €${(item.product.price * item.quantity).toFixed(2)}</p>
            `;
      container.append(cartItemElement);
    });

    const totalElement = document.createElement("h3");
    totalElement.textContent = `Kokku: €${cartParam
      .calculateTotal()
      .toFixed(2)}`;
    container.append(totalElement);
  }
};
