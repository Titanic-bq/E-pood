import { displayAllProductsView } from "./views/allProductsView.js";
import { displayProductDetailView } from "./views/productDetailView.js";
import { displayCartView } from "./views/cartView.js";
import { displayFavoritesView } from "./views/favoritesView.js";
import { displayCategoryView } from "./views/categoryView.js";

const renderView = (view, param) => {
  document.getElementById("main-container").innerHTML = "";
  document.getElementById("detailed-view").innerHTML = "";
  document.getElementById("cart-view").innerHTML = "";
  document.getElementById("favorite-view").innerHTML = "";

  const views = {
    products: () => displayAllProductsView(),
    product: () => displayProductDetailView(param),
    cart: () => displayCartView(),
    favorites: () => displayFavoritesView(),
    category: () => displayCategoryView(param),
  };

  if (views[view]) views[view]();
};

// navigate – kasutaja navigeerimine
export const navigate = (view, param) => {
  let url = `/${view}`;

  if (view === "product") {
    url = `/product/${param}`;
  }

  if (view === "category") {
    url = `/category/${encodeURIComponent(param)}`;
  }

  window.history.pushState({}, "", url);
  renderView(view, param);
};

// initRouter – refresh/back/forward
export const initRouter = () => {
  const path = window.location.pathname;

  if (path === "/products") {
    renderView("products");
  } else if (path === "/favorites") {
    renderView("favorites");
  } else if (path === "/cart") {
    renderView("cart");
  } else if (path.startsWith("/product/")) {
    const id = path.split("/")[2];
    renderView("product", id);
  } else if (path.startsWith("/category/")) {
    const categoryName = decodeURIComponent(path.split("/")[2]);
    renderView("category", categoryName);
  } else {
    renderView("products"); // default
  }
};

window.addEventListener("popstate", initRouter);
