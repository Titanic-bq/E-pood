# E-pood

This is a simple e-commerce system built with JavaScript, featuring product management, shopping cart, orders, and customer favorites. The application uses modular JavaScript with ES6 modules, a Node.js backend with Express, and persists data in JSON files.

## What was done in this project

- **Frontend**: Modular JavaScript application with separate views for products, cart, favorites, and product details. Uses client-side routing for navigation without page reloads.
- **Backend**: Node.js server with Express, providing REST API endpoints for products, categories, favorites, and cart persistence.
- **Data**: Fetches initial product data from FakeStoreAPI and saves it to local JSON files. User data (favorites and cart) is persisted per user ID in JSON files.
- **Features**:
  - Product listing with category filtering
  - Shopping cart with quantity management and VAT calculations
  - Favorites system
  - Order placement
  - Client-side routing with URL support
  - Data persistence across page refreshes

## Node version used

Node.js v23.11.0

## How to run the project

1. Install dependencies:

   ```
   npm install
   ```

2. Start the server:

   ```
   npm start
   ```

3. Open your browser and go to `http://localhost:8000`

The application will load products from the local JSON file, and user data will be persisted in the `data/` directory.
