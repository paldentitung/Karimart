import { products } from "./scripts/product-data.js";
import { AddToCart } from "./scripts/cart.js";
let productHtml = "";
products.forEach((product) => {
  productHtml += `
    <div class="card">
        <div class="card-image">
          <img
            src=${product.image}
            alt=""
          />
        </div>
        <!-- card info -->
        <div class="card-info">
          <!-- name -->
          <div class="card-name">
            ${product.name}
          </div>
          <!-- rating -->
          <div class="rating-container">
            <img src="../images-folder/rating-${
              product.rating.stars * 10
            }.png" alt="" />
            <span>${product.rating.count}</span>
          </div>
          <!-- price -->
          <div class="price-container">
            <span class="price"> $${(product.priceCents / 100).toFixed(
              2
            )}</span>
          </div>
          <!-- quantity -->
          <div class="quantity-container">
            <input type="number" min="1" max="10" class="js-quantity" data-product-id="${
              product.id
            }" />
          </div>
          <!-- add to card button -->
          <div class="add-to-cart-container">
            <button class="add-to-cart js-add-to-cart-btn" data-product-id="${
              product.id
            }">add to cart</button>
          </div>
        </div>
      </div>


    `;
});

let cardContainer = document.querySelector(".card-container");

cardContainer.innerHTML = productHtml;

// add to cart functional

document.querySelectorAll(".js-add-to-cart-btn").forEach((AddButton) => {
  AddButton.addEventListener("click", () => {
    console.log("clicked");
    //
    const ProductId = AddButton.dataset.productId;

    // taking user input for quantity
    const productQuantityInput =
      AddButton.closest(".card").querySelector(".js-quantity"); // Adjust selector to ensure it picks the right input
    const productQuantity = parseInt(productQuantityInput.value);
    console.log(productQuantity);
    AddToCart(ProductId, productQuantity);

    // order tracker
    let orderTracker = document.querySelector(".order-tracker");
    let orderCount = 1;
    orderTracker.innerHTML = ++orderCount;
    console.log(orderTracker);
  });
});

// menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menubtn");
  const jsIcon = menuBtn.querySelector(".js-icon");

  menuBtn.addEventListener("click", () => {
    let nav = document.querySelector(".nav");
    let inputContainer = document.querySelector(".input-container");
    let cart = document.querySelector(".cart");
    let header = document.querySelector(".js-header");

    header.classList.toggle("active");
    nav.classList.toggle("active");
    inputContainer.classList.toggle("active");
    cart.classList.toggle("active");

    // Toggle between "menu" and "close"
    jsIcon.textContent = nav.classList.contains("active") ? "close" : "menu";
  });
});
