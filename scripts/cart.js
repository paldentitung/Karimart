export let cart = JSON.parse(localStorage.getItem("cart") || "[]");

// Add product to cart
export function AddToCart(productId, quantity = 1) {
  const matchingProduct = cart.find((item) => item.productId === productId);

  if (matchingProduct) {
    matchingProduct.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
    });
  }

  saveToStorage();
  console.log("Cart:", cart);
}

// Delete product from cart
export function deleteProduct(productId) {
  const productIndex = cart.findIndex((item) => item.productId === productId);

  if (productIndex !== -1) {
    cart.splice(productIndex, 1);
    saveToStorage();
  }
}

// Save cart to localStorage
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
  // Re-fetch cart after saving to localStorage to ensure consistency
  cart = JSON.parse(localStorage.getItem("cart") || "[]");
}

// Optional: Re-initialize cart when page reloads
function initializeCart() {
  // Re-fetch the cart if it's already in localStorage
  cart = JSON.parse(localStorage.getItem("cart") || "[]");
}

// Initial call to set cart state
initializeCart();
