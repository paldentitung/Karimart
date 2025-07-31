document.querySelectorAll(".js-add-to-cart-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log("clicked", btn);

    // Find the nearest parent product container
    const productContainer = btn.closest(".card"); // assumes each product has a class="product"

    // Then find the message inside this product only
    const message = productContainer.querySelector(".added-to-cart-message");
    if (message) {
      message.classList.add("active");
    }
    setTimeout(() => {
      message.classList.remove("active");
    }, 2000);
  });
});
