class Cart {
  constructor() {
    this.items = this.loadCart();
    this.onChangeCallback = null;
  }

  loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.items));
    this.triggerChange();
  }

  onChange(callback) {
    this.onChangeCallback = callback;
  }

  triggerChange() {
    if (this.onChangeCallback) {
      this.onChangeCallback();
    }
  }

  addProduct(product, quantity = 1) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id,
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }

    this.saveCart();
  }

  removeProduct(productId) {
    const existingItem = this.items.find(
      (item) => item.product.id === productId,
    );

    if (existingItem) {
      existingItem.quantity -= 1;

      if (existingItem.quantity <= 0) {
        this.items = this.items.filter((item) => item.product.id !== productId);
      }
    }

    this.saveCart();
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  getAllProducts() {
    return this.items;
  }

  get totalItems() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  calculateTotal() {
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }
}

export const cartConstructor = new Cart();
