import { Product } from "./product.js";

export const getProductsDataFromJson = async () => {
  try {
    const data = await fetch("./data.json");
    const jsondata = data.json();
    const constructedData = jsondata.map(
      (product) =>
        new Product(product.id, product.title, product.price, product.category)
    );
    return constructedData;
  } catch (error) {
    console.error(error);
  }
};
