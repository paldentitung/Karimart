import { products } from "./product-data.js";
import { deleteProduct } from "./cart.js";
import { quantityhandling } from "./utils/QuantityHandleing.js";

let todayDate = dayjs();
let FreeShippingdate = todayDate.add(7, "day");
let threeDayshipping = todayDate.add(3, "day");

function renderCheckoutCart() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  let checkoutCard = "";
  let totalQuantity = 0;

  // Track shipping cost per product (default free = 0)
  const shippingSelections = {};
  let subtotal = 0;

  cart.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    if (product) {
      const quantity = cartItem.quantity;
      totalQuantity += quantity;
      subtotal += (product.priceCents / 100) * quantity;

      shippingSelections[product.id] = 0; // default free shipping

      quantityhandling(quantity);

      checkoutCard += `
        <section class="card">
          <div class="delivery-date">
            <span>Delivery Date :<span class="js-delivery-date"> ${todayDate.format(
              "MMM D YYYY"
            )}</span> </span>
          </div>
          <div class="product-container">
            <div class="product">
              <div class="product-image">
                <img src="${product.image}" alt="${product.name}" />
              </div>
              <div class="product-informations">
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${(
                  product.priceCents / 100
                ).toFixed(2)}</div>
                <div class="product-quantity-manage">
                  <span class="product-quantity"> Quantity: </span>
                  <span class="product-quantity-tracker">${quantity}</span>
                  <input class="js-quantity-input" type="number" value="${quantity}" style="display: none; width: 50px;" />
                  <button class="quantity-update js-update">Update</button>
                  <button class="quantity-delete js-delete" data-product-id="${
                    product.id
                  }">Delete</button>
                </div>
              </div>
            </div>
            <div class="delivery-date-choose-container">
              <span>Choose a delivery option:</span>
              <div class="delivery-option">
                <div>
                  <input type="radio" name="${
                    product.id
                  }" class="js-shipping-radio" value="free" checked>
                  <span class="delivery-option-date">${FreeShippingdate.format(
                    "dddd, MMM D YYYY"
                  )}</span><br>
                  FREE Shipping
                </div>
                <div>
                  <input type="radio" name="${
                    product.id
                  }" class="js-shipping-radio" value="standard">
                  <span class="delivery-option-date">${threeDayshipping.format(
                    "dddd, MMM D YYYY"
                  )}</span><br>
                  $4.99 - Shipping
                </div>
                <div>
                  <input type="radio" name="${
                    product.id
                  }" class="js-shipping-radio" value="express">
                  <span class="delivery-option-date">${todayDate
                    .add(1, "day")
                    .format("dddd, MMM D YYYY")}</span><br>
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </section>
      `;
    }
  });

  document.querySelector(".js-card-container").innerHTML = checkoutCard;
  document.querySelector(".checkout-items").innerHTML = totalQuantity;

  if (cart.length === 0) {
    const viewProductBtn = document.createElement("button");
    const a = document.createElement("a");
    const div = document.createElement("div");
    a.href = `../index.html`;
    a.appendChild(viewProductBtn);
    div.appendChild(a);
    div.classList.add("view-product-btn-container");
    viewProductBtn.innerHTML = "View Products";
    document.querySelector(".js-card-container").innerHTML = "";
    document.querySelector(".js-card-container").appendChild(div);
  }

  // Calculate total shipping cost (sum of all products shipping * quantity)
  function calculateShippingCost() {
    let shippingCost = 0;
    cart.forEach((cartItem) => {
      const productId = cartItem.productId;
      const quantity = cartItem.quantity;
      const selectedShipping = shippingSelections[productId] || 0;
      shippingCost += selectedShipping * quantity;
    });
    return shippingCost;
  }

  // Update order summary DOM
  function renderOrderSummary() {
    const shippingCost = calculateShippingCost();
    const tax = subtotal * 0.1;
    const totalBeforeTax = subtotal + shippingCost;
    const total = totalBeforeTax + tax;

    const orderSummarySection = document.querySelector(
      ".order-price-calculation"
    );
    const summaryRows = orderSummarySection.querySelectorAll(".summary-rows");
    const totalOrderRow = orderSummarySection.querySelector(".total-order");

    summaryRows[0].children[0].textContent = `items(${totalQuantity})`;
    summaryRows[0].children[1].textContent = `$${subtotal.toFixed(2)}`;

    summaryRows[1].children[1].textContent =
      shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : "FREE";

    summaryRows[2].children[1].textContent = `$${totalBeforeTax.toFixed(2)}`;

    summaryRows[3].children[1].textContent = `$${tax.toFixed(2)}`;

    totalOrderRow.querySelector(
      ".total-product-price"
    ).textContent = `$${total.toFixed(2)}`;
  }

  renderOrderSummary();

  // Delete product handler
  document.querySelectorAll(".js-delete").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      deleteProduct(productId);
      renderCheckoutCart();
    });
  });

  // Shipping option change handler
  document.querySelectorAll(".js-shipping-radio").forEach((radio) => {
    radio.addEventListener("change", () => {
      const productId = radio.name;

      switch (radio.value) {
        case "free":
          shippingSelections[productId] = 0;
          break;
        case "standard":
          shippingSelections[productId] = 4.99;
          break;
        case "express":
          shippingSelections[productId] = 9.99;
          break;
      }

      const parent = radio.closest(".delivery-option");
      const deliveryDisplay = parent
        .closest(".card")
        .querySelector(".js-delivery-date");

      if (radio.value === "express") {
        deliveryDisplay.innerHTML = `${dayjs()
          .add(1, "day")
          .format("dddd, MMM D YYYY")}`;
      } else if (radio.value === "standard") {
        deliveryDisplay.innerHTML = `${dayjs()
          .add(3, "day")
          .format("dddd, MMM D YYYY")}`;
      } else {
        deliveryDisplay.innerHTML = `${dayjs()
          .add(7, "day")
          .format("dddd, MMM D YYYY")}`;
      }

      renderOrderSummary();
    });
  });

  // Quantity update handler
  document.querySelectorAll(".js-update").forEach((updateButton) => {
    updateButton.addEventListener("click", () => {
      const card = updateButton.closest(".card");
      const quantitySpan = card.querySelector(".product-quantity-tracker");
      const quantityInput = card.querySelector(".js-quantity-input");
      const productId = card.querySelector(".js-delete").dataset.productId;

      if (quantityInput.style.display === "none") {
        quantityInput.style.display = "inline-block";
        quantitySpan.style.display = "none";
        updateButton.innerText = "Save";
      } else {
        const newQuantity = parseInt(quantityInput.value);
        if (isNaN(newQuantity) || newQuantity < 1) {
          alert("Please enter a valid number");
          return;
        }

        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const productInCart = cart.find((item) => item.productId === productId);
        if (productInCart) {
          productInCart.quantity = newQuantity;
          localStorage.setItem("cart", JSON.stringify(cart));
        }

        renderCheckoutCart();
      }
    });
  });
}

renderCheckoutCart();
// Place order button handler
const placeOrderBtn = document.querySelector(".place-order");
if (placeOrderBtn) {
  placeOrderBtn.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length === 0) {
      alert("Your cart is empty. Add items before placing an order.");
      return;
    }

    // Here you would typically send order data to backend API

    // For now, just show confirmation, clear cart and redirect
    alert("Thank you for your order! Your order has been placed successfully.");

    localStorage.removeItem("cart"); // Clear cart
    renderCheckoutCart(); // Re-render to update UI

    // Redirect example - uncomment if you want to redirect
    // window.location.href = "/thank-you.html";
  });
}
