import { products } from "./product-data.js";
import { deleteProduct } from "./cart.js";

// working with day js libary

let todayDate = dayjs();

let FreeShippingdate = todayDate.add(7, "day");
let threeDayshipping = todayDate.add(3, "day");

// Function to render checkout items
function renderCheckoutCart() {
  const cart = JSON.parse(localStorage.getItem("cart") || []);
  let checkoutCard = "";
  let viewProductBtn;
  cart.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.productId);

    if (product) {
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
                  <span class="product-quantity-tracker">1</span>
                  <button class="quantity-update js-update">Update</button>
                  <button class="quantity-delete js-delete" data-product-id="${
                    product.id
                  }">Delete</button>
                </div>
              </div>
            </div>
            <div class="delivery-date-choose-container">
              <span>Choose a delivery option:</span>
              <!-- shipping options here -->
           <div class="delivery-option">
               <div>
              <input type="radio" name="${
                product.id
              }" class="js-shipping-radio" value="free" >
              <span class="delivery-option-date">${FreeShippingdate.format(
                "dddd, MMM D YYYY"
              )}</span><br>
              FREE Shipping
            </div>

            <div>
              <input type="radio" name="${product.id}" 
             class="js-shipping-radio" value="standard">
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

    if (cart.length === 0) {
      viewProductBtn = document.createElement("button");
      viewProductBtn.innerHTML = "button";

      document.querySelector(".js-card-container").innerHTML = viewProductBtn;
    }
  });

  document.querySelector(".js-card-container").innerHTML = checkoutCard;

  // Add event listeners again after rendering
  document.querySelectorAll(".js-delete").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      deleteProduct(productId);
      renderCheckoutCart(); // re-render the cart
    });
  });
  // shipping radio
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
}

// Initial render
renderCheckoutCart();
