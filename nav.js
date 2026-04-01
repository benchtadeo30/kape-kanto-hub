/*
  ====================================================
  KANTO KAPE HUB — nav.js
  Shared JavaScript for ALL pages.
  Written by: Angel Parecto

  Handles:
    1. Open / close the side navigation
    2. Escape key closes side nav
    3. Highlights the active page link
  ====================================================
*/

/* Opens the side nav */
function openSideNav() {
  document.getElementById("side-nav").classList.add("open");
  document.getElementById("overlay").classList.add("visible");
}

/* Closes the side nav */
function closeSideNav() {
  document.getElementById("side-nav").classList.remove("open");
  document.getElementById("overlay").classList.remove("visible");
}

/* Press Escape to close side nav */
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeSideNav();
    closeCart();
  }
});

/* Auto-highlight the current page link in both navbars */
document.addEventListener("DOMContentLoaded", function () {
  var currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "" || currentPage === "/") {
    currentPage = "index.html";
  }
  var allNavLinks = document.querySelectorAll("#top-nav a, #side-nav a");
  allNavLinks.forEach(function (link) {
    var linkPage = link.getAttribute("href").split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
});
