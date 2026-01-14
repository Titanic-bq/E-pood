import { displayCartView } from "../views/cartView";

export class Cart {
  constructor() {
    this.items = [];
  }

  addProduct(product, quantity = 1) {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    this.displayTotalItems();
  }

  updateProductQuantity(productId, delta) {
    const item = this.items.find((item) => item.product.id === productId);

    if (item) {
      item.quantity = delta > 0 ? delta : 1;
    }

    if (delta <= 0) {
      this.removeProduct(productId);
    }

    this.displayTotalItems();
    displayCartView();
  }

  removeProduct(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.displayTotalItems();
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
