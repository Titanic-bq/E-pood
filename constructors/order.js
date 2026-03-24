class Order {
  constructor(cart) {
    this.orderDate = new Date();
    this.cart = cart;
  }

  printOrder() {
    console.log("Tellimuse kuupäev:", this.orderDate.toLocaleString());
    console.log("Tooted ostukorvis:");
    this.cart.items.forEach((item) => {
      console.log(
        `- ${item.product.title} (${item.quantity} tk) - ${item.product.price}€/tk`,
      );
    });
    console.log("Kogusumma:", this.cart.calculateTotal() + "€");
    console.log("Kokku tooteid:", this.cart.totalItems);
  }
}

export { Order };
