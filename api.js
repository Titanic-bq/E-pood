import { Product } from "./constructors/product.js";

export const getProductsDataFromJson = async () => {
  try {
    const response = await fetch("/api/products");
    const jsondata = await response.json();
    console.log("Products from backend:", jsondata);
    const constructedData = jsondata.map(
      (product) =>
        new Product(
          product.id,
          product.title || product.nimi,
          product.price || product.hind,
          product.category || product.kategooria
        )
    );
    console.log("Constructed products:", constructedData);
    return constructedData;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
