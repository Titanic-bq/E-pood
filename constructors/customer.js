import { Order } from "./order.js";

class Customer {
  constructor(name) {
    this.name = name;
    this.orderHistory = [];
  }

  placeOrder(cart) {
    const newOrder = new Order(cart);
    this.orderHistory.push(newOrder);
    console.log(`${this.name} tegi uue tellimuse.`);
  }

  printOrderHistory() {
    console.log(`Tellimuste ajalugu kliendil: ${this.name}`);
    if (this.orderHistory.length === 0) {
      console.log("Tellimusi pole veel tehtud.");
      return;
    }

    this.orderHistory.forEach((order, index) => {
      console.log(
        `#${
          index + 1
        } - Kuupäev: ${order.orderDate.toLocaleString()}, Kogusumma: ${order.cart.calculateTotal()}€`,
      );
    });
  }
}

export { Customer };
