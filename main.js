//Product klass

class Product {
  constructor(id, title, price, category) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.category = category;
  }

  describe() {
    return `${this.title} (${this.category}) - price: ${this.price} €`;
  }
  static discountedPrice(price, discountPercent) {
    return price - price * (discountPercent / 100);
  }
}
//Cart klass

class Cart {
  constructor() {
    this.items = [];
  }

  addProduct(product, quantity) {
    const existing = this.items.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }
  removeProduct(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }
  calculateTotal() {
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }

  get totalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}

//Order klass

class Order {
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

class Customer {
  constructor(name) {
    this.name = name;
    this.orderHistory = [];
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

const laptop = new Product(1, "Sülearvuti", 79.55, "Elektroonika");

console.log(laptop.describe());
console.log(Product.discountedPrice(laptop.price, 10));
const cart = new Cart();

cart.addProduct(laptop, 2);

console.log(cart.calculateTotal());
console.log(cart.totalItems);
