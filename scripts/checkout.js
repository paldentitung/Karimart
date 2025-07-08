import { products } from "./product-data.js";
import { deleteProduct } from "./cart.js";
import { quantityhandling } from "./utils/QuantityHandleing.js";

// working with day js library
let todayDate = dayjs();
let FreeShippingdate = todayDate.add(7, "day");
let threeDayshipping = todayDate.add(3, "day");

// Function to render checkout items
function renderCheckoutCart() {
  const cart = JSON.parse(localStorage.getItem("cart") || []);
  let checkoutCard = "";
  let viewProductBtn;
  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);
    if (product) {
      const quantity = cartItem.quantity;
      totalQuantity += quantity;

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
                  }" class="js-shipping-radio" value="free">
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
                    "dddd,MMM D YYYY"
                  )}</span><br>
                  $4.99 - Shipping
                </div>
                <div>
                  <input type="radio" name="${
                    product.id
                  }" class="js-shipping-radio" value="express">
                  <span class="delivery-option-date">${todayDate
                    .add(1, "day")
                    .format("dddd,MMM D YYYY")}</span><br>
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
    viewProductBtn = document.createElement("button");
    viewProductBtn.innerHTML = "View Products";
    document.querySelector(".js-card-container").innerHTML = "";
    document.querySelector(".js-card-container").appendChild(viewProductBtn);
  }

  // Delete handlers
  document.querySelectorAll(".js-delete").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      deleteProduct(productId);
      renderCheckoutCart();
    });
  });

  // Shipping option handlers
  document.querySelectorAll(".js-shipping-radio").forEach((radio) => {
    radio.addEventListener("change", () => {
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
      } else if (radio.value === "free") {
        deliveryDisplay.innerHTML = `${dayjs()
          .add(7, "day")
          .format("dddd, MMM D YYYY")}`;
      }
    });
  });

  // Update handlers
  document.querySelectorAll(".js-update").forEach((updateButton) => {
    updateButton.addEventListener("click", () => {
      const card = updateButton.closest(".card");
      const quantitySpan = card.querySelector(".product-quantity-tracker");
      const quantityInput = card.querySelector(".js-quantity-input");
      const productId = card.querySelector(".js-delete").dataset.productId;

      if (quantityInput.style.display === "none") {
        // First click: show input
        quantityInput.style.display = "inline-block";
        quantitySpan.style.display = "none";
        updateButton.innerText = "Save";
      } else {
        // Second click: save
        const newQuantity = parseInt(quantityInput.value);
        if (isNaN(newQuantity) || newQuantity < 1) {
          alert("Please enter a valid number");
          return;
        }

        const cart = JSON.parse(localStorage.getItem("cart") || []);
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

// Initial render
renderCheckoutCart();
