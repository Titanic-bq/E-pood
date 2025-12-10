export const displayAllProductsView = (product) => {
  const container = document.getElementById("main-container");
  container.innerHTML = "";

  const productDetail = document.createElement("div");
  productCard.classlist.add("product");

  productCard.innerHTML = `
        <h2>${product.name}</h2>
        <p>Kategooria: ${product.category}</p>
        <p>Hind: €${product.price}</p>
        <p>Toote ID: ${product.id}</p>
    `;

  customer.append(productCard);
};
