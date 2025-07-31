// menu toggle
// Menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menubtn");
  const icon = menuBtn.querySelector(".js-icon");

  const nav = document.querySelector("nav");
  const inputContainer = document.querySelector(".input-container");

  menuBtn.addEventListener("click", () => {
    const isActive = nav.classList.toggle("active");

    inputContainer.classList.toggle("active", isActive);

    icon.textContent = isActive ? "close" : "menu";
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   const links = document.querySelectorAll("nav ul li a");

//   links.forEach((a) => {
//     a.addEventListener("click", (e) => {
//       e.preventDefault();
//       links.forEach((ael) => ael.classList.remove("active"));
//       a.classList.add("active");
//     });
//   });
// });
