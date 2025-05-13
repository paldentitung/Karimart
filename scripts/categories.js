import { products } from "./product-data.js";

const selectCategories = document.getElementById("select-categories");
let cardContainer = document.querySelector(".card-container");

selectCategories.addEventListener("input", () => {
  // reset the container

  let cardContainerHTml = "";
  let filterProduct = products.filter(
    (item) => item.category === selectCategories.value
  );

  if (filterProduct.length === 0) {
    cardContainerHTml = "no product found";
  }
  filterProduct.forEach((product) => {
    cardContainerHTml += `
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

  cardContainer.innerHTML = cardContainerHTml;
});
