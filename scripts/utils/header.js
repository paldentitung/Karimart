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
