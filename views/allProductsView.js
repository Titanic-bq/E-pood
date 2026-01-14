export const displayAllProductsView = (products) => {
  const container = document.getElementById("main-container");

  container.innerHTML = "<h2>Tooted</h2>";

  const productsContainer = document.createElement("div");
  productsContainer.classList.add("products-container");

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product");
    productCard.innerHTML = `
            <h3>${product.title}</h3>
            <p>Hind: €${product.price}</p>
            <p>Kategooria: ${product.category}</p>
            <button class="favorites">Lisa lemmikutesse</button>
        `;

    const cartButton = document.createElement("button");
    cartButton.textContent = "Lisa ostukorvi";

    productCard.appendChild(cartButton);
    productsContainer.appendChild(productCard);
  });

  container.append(productsContainer);
};
