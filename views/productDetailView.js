export const displayProductDetailView = (product) => {
  const container = document.getElementById("main-container");
  container.innerHTML = "";

  const productDetail = document.createElement("div");
  productDetail.classList.add("product-detail");

  productDetail.innerHTML = `
        <h2>${product.title}</h2>
        <p>Kategooria: ${product.category}</p>
        <p>Hind: €${product.price}</p>
        <p>Toote ID: ${product.id}</p>
        <p>Kirjeldus: ${product.description}</p>
        <p>Laoseis: ${product.stock} tk</p>
        <p>Tootja: ${product.manufacturer}</p>
    `;

  container.append(productDetail);
};
