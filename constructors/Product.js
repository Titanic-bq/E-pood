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

export { Product };
