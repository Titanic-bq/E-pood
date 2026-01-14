import { Order } from "./order.js";

export class Customer {
  constructor(name) {
    this.name = name;
    this.orderHistory = [];
    this.favorites = [];
  }

  placeOrder(cart) {
    const newOrder = new Order(cart);
    this.orderHistory.push(newOrder);
  }

  printOrderHistory() {
    console.log(`Kliendi ${this.name} tellimuste ajalugu:`);

    this.orderHistory.forEach((order, index) => {
      console.log(
        `${index + 1}. Tellitud: ${order.orderDate.toLocaleString()}, ` +
          `kogusumma: ${order.cart.calculateTotal()}€`
      );
    });
  }

  toggleFavorites(product) {
    const existingItem = this.favorites.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      this.favorites = this.favorites.filter(
        (item) => item.product.id !== product.id
      );
    } else {
      this.favorites.push({ product });
    }
  }

  isFavorite(productId) {
    const existingItem = this.favorites.find(
      (item) => item.product.id === productId
    );
    return !!existingItem;
  }

  getAllFavorites() {
    return this.favorites;
  }
}
