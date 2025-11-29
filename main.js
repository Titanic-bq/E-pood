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
const laptop = new Product(1, "Sülearvuti", 79.55, "Elektroonika");

console.log(laptop.describe());
console.log(Product.discountedPrice(laptop.price, 10));

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
  calculateTotal() {}

  totalItems() {}
}
