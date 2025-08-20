import { products } from "./scripts/product-data.js";
import { AddToCart } from "./scripts/cart.js";
import { quantityhandling } from "./scripts/utils/QuantityHandleing.js";

const cardContainer = document.querySelector(".card-container");
const orderTracker = document.querySelector(".order-tracker");
const searchInput = document.querySelector(".js-search-input");
const noProductsMessage = document.querySelector(".no-products-message"); // Add this div in your HTML

// Utility: Renders a full product card
function createProductCard(product) {
  return `
    <div class="card" style="position: relative;">
      <div class="card-image">
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="card-info">
        <div class="card-name">${product.name}</div>
        <div class="rating-container">
          <img src="../images-folder/rating-${
            product.rating.stars * 10
          }.png" alt="rating" />
          <span>${product.rating.count}</span>
        </div>
        <div class="price-container">
          <span class="price">$${(product.priceCents / 100).toFixed(2)}</span>
        </div>
        <div class="quantity-container">
          <input type="number" min="1" max="10" value="1" class="js-quantity" />
        </div>
        <div class="added-to-cart-message">Added to cart</div>
        <div class="add-to-cart-container">
          <button class="add-to-cart js-add-to-cart-btn" data-product-id="${
            product.id
          }">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  `;
}

// Render and attach listeners, show no products message if empty
function renderProducts(productList) {
  if (productList.length === 0) {
    cardContainer.innerHTML = "";
    noProductsMessage.style.display = "block";
  } else {
    noProductsMessage.style.display = "none";
    cardContainer.innerHTML = productList.map(createProductCard).join("");
    attachAddToCartListeners();
  }
}

// Add event listeners to Add-to-Cart buttons
function attachAddToCartListeners() {
  document.querySelectorAll(".js-add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.dataset.productId;
      const quantityInput = btn.closest(".card").querySelector(".js-quantity");
      const quantity = parseInt(quantityInput.value);

      if (isNaN(quantity) || quantity < 1) {
        alert("Please enter a valid quantity (1 or more)");
        return;
      }

      AddToCart(productId, quantity);
      quantityhandling(quantity);
      updateOrderCountUI();

      // Show "Added to cart" message
      const productContainer = btn.closest(".card");
      const message = productContainer.querySelector(".added-to-cart-message");
      if (message) {
        message.classList.add("active");
        setTimeout(() => {
          message.classList.remove("active");
        }, 2000);
      }
    });
  });
}

// Update the order count UI
function updateOrderCountUI() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const orderCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (orderTracker) orderTracker.innerHTML = orderCount;
}

// Initial product rendering
renderProducts(products);
updateOrderCountUI();

// Search functionality
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );
  renderProducts(filtered);
});
document.title = "Karimart";
