/*
  ============================================
  KANTO KAPE HUB - nav.js

  What this file does:
    1. Opens the side nav (hamburger click)
    2. Closes the side nav
    3. Highlights the current page link
  ============================================
*/

function openSideNav() {
  document.getElementById("side-nav").classList.add("open");
  document.getElementById("overlay").classList.add("visible");
}

function closeSideNav() {
  document.getElementById("side-nav").classList.remove("open");
  if (!document.getElementById("cart-drawer") || !document.getElementById("cart-drawer").classList.contains("open")) {
    document.getElementById("overlay").classList.remove("visible");
  }
}

/* Press Escape to close side nav or cart */
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeSideNav();
    if (typeof closeCart === "function") closeCart();
  }
});

/* Highlights the link of the current page */
document.addEventListener("DOMContentLoaded", function() {
  var page = window.location.pathname.split("/").pop();
  if (page === "" || page === "/") page = "index.html";

  /* These 3 pages all belong to the same "Account" menu item */
  var accountPages = ["account.html", "login.html", "register.html"];

  var links = document.querySelectorAll("#top-nav a, #side-nav a");
  links.forEach(function(link) {
    var linkPage = link.getAttribute("href").split("/").pop();

    if (accountPages.indexOf(page) !== -1 && linkPage === "account.html") {
      link.classList.add("active");
      return;
    }

    if (linkPage === page) {
      link.classList.add("active");
    }
  });
});
