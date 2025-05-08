import { products } from "./product-data.js";
import { deleteProduct } from "./cart.js";

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
            <span>Delivery Date : Wednesday, May 14 </span>
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
              <input type="radio" name="${product.id}" value="free" >
              <span class="delivery-option-date">Thursday, May 15</span><br>
              FREE Shipping
            </div>

            <div>
              <input type="radio" name="${product.id}" value="standard">
              <span class="delivery-option-date">Friday, May 9</span><br>
              $4.99 - Shipping
            </div>

            <div>
              <input type="radio" name="${product.id}" value="express">
              <span class="delivery-option-date">Wednesday, May 7</span><br>
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
}

// Initial render
renderCheckoutCart();
