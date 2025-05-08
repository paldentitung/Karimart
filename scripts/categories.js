import { products } from "./product-data.js";

const selectCategories = document.getElementById("select-categories");
let cardContainer = document.querySelector(".card-container");

selectCategories.addEventListener("input", () => {
  // Clear the previous cards before adding new ones
  cardContainer.innerHTML = "";

  // Get the selected category value from the dropdown
  const selectedCategory = selectCategories.value;

  // If no category is selected (e.g., empty string), exit early
  if (!selectedCategory) {
    return;
  }

  // Filter products based on the selected category
  const filterProducts = products.filter((product) =>
    product.categories.some((category) =>
      category.toLowerCase().includes(selectedCategory.toLowerCase())
    )
  );

  // If no products match the selected category, show a message
  if (filterProducts.length === 0) {
    cardContainer.innerHTML = "<p>No products available for this category.</p>";
    return;
  }

  // Loop through filtered products and generate the card HTML for each
  filterProducts.forEach((product) => {
    cardContainer.innerHTML += `
      <div class="card">
        <div class="card-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="card-info">
          <div class="card-name">${product.name}</div>
          <div class="rating-container">
            <img src="images-folder/rating-${
              product.rating.stars * 10
            }.png" alt="rating" />
            <span>${product.rating.count}</span>
          </div>
          <div class="price-container">
            <span class="price">$${(product.priceCents / 100).toFixed(2)}</span>
          </div>
          <div class="quantity-container">
            <input type="number" min="1" max="10" class="js-quantity" data-product-id="${
              product.id
            }" />
          </div>
          <div class="add-to-cart-container">
            <button class="add-to-cart js-add-to-cart-btn" data-product-id="${
              product.id
            }">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  });
});
