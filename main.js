import { initRouter } from "./router.js";
import "./api.js";

// Main entry point - initialize routing after DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  initRouter();
});
