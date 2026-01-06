class Customer {
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
}
