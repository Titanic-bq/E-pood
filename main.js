import { Product } from "./constructors/Product.js";

import { Cart } from "./constructors/Cart.js";

import { Customer } from "./constructors/Customer.js";

// Loo mõned tooted

const laptop = new Product(1, "Sülearvuti", 999.99, "Elektroonika");

const phone = new Product(2, "Telefon", 599.99, "Elektroonika");

// Loo ostukorv ja lisa tooted

const cart = new Cart();

cart.addProduct(laptop, 1);

cart.addProduct(phone, 2);

// Kuvage ostukorvi summa ja toodete arv

console.log("Kogusumma:", cart.calculateTotal());

console.log("Kokku tooteid ostukorvis:", cart.totalItems);

// Loo klient ja esita tellimus

const customer = new Customer("Alice");

customer.placeOrder(cart);

// Kuvage tellimuste ajalugu

customer.printOrderHistory();

const laptop = new Product(1, "Sülearvuti", 79.55, "Elektroonika");

console.log(laptop.describe());
console.log(Product.discountedPrice(laptop.price, 10));
const cart = new Cart();

cart.addProduct(laptop, 2);

console.log(cart.calculateTotal());
console.log(cart.totalItems);

const order = new Order(cart);
order.printOrder();

const customer = new Customer("Alice");
customer.placeOrder(cart);
customer.printOrderHistory();
