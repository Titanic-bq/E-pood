export class Order {
  constructor(cart) {
    this.orderDate = new Date();
    this.cart = cart;
  }
  printOrder() {
    console.log("Tellimuse kuupäev:", this.orderDate.toLocaleString());
    console.log("Tooted:");

    this.cart.items.forEach((item) => {
      console.log(
        `- ${item.product.title} x ${item.quantity} = ${
          item.product.price * item.quantity
        }€`
      );
    });

    console.log("Kogusumma:", this.cart.calculateTotal() + "€");
  }
}
