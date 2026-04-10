/*
  nav.js

  This file controls the navigation.
  It opens the side menu, changes links after login,
  and highlights the page you are on.
*/

function openSideNav() {
  /* Show the side menu and dark overlay */
  document.getElementById("side-nav").classList.add("open");
  document.getElementById("overlay").classList.add("visible");
}

function closeSideNav() {
  /* Hide the side menu */
  document.getElementById("side-nav").classList.remove("open");

  const cartDrawer = document.getElementById("cart-drawer");

  if (!cartDrawer || !cartDrawer.classList.contains("open")) {
    document.getElementById("overlay").classList.remove("visible");
  }
}

function createNavLink(linkText, linkHref, closeOnClick) {
  /* Make one nav link using JavaScript */
  const listItem = document.createElement("li");
  const link = document.createElement("a");

  link.textContent = linkText;
  link.href = linkHref;

  if (closeOnClick) {
    link.setAttribute("onclick", "closeSideNav()");
  }

  listItem.appendChild(link);
  return listItem;
}

function cleanOldAuthLinks(listBox) {
  /* Remove old login-related links before adding the correct ones */
  const oldLinks = listBox.querySelectorAll('a[href="login.html"], a[href="register.html"], a[href="orders.html"], a[href="profile.html"], a[href="admin.html"]');

  oldLinks.forEach(function(link) {
    if (link.parentElement) {
      link.parentElement.remove();
    }
  });
}

function updateTopNavLinks(currentUser) {
  /* Change the top nav based on whether someone is signed in */
  const topLinks = document.querySelector("#top-nav .top-links");

  if (!topLinks) {
    return;
  }

  cleanOldAuthLinks(topLinks);

  if (currentUser) {
    topLinks.appendChild(createNavLink("My Orders", "orders.html", false));
    topLinks.appendChild(createNavLink("Settings", "profile.html", false));

    if (currentUser.role === "admin") {
      topLinks.appendChild(createNavLink("Admin", "admin.html", false));
    }

    return;
  }

  topLinks.appendChild(createNavLink("Sign In", "login.html", false));
}

function updateSideNavLinks(currentUser) {
  /* Do the same link update for the side nav */
  const sideList = document.querySelector("#side-nav ul");

  if (!sideList) {
    return;
  }

  cleanOldAuthLinks(sideList);

  if (currentUser) {
    sideList.appendChild(createNavLink("My Orders", "orders.html", true));
    sideList.appendChild(createNavLink("Settings", "profile.html", true));

    if (currentUser.role === "admin") {
      sideList.appendChild(createNavLink("Admin", "admin.html", true));
    }

    return;
  }

  sideList.appendChild(createNavLink("Sign In", "login.html", true));
}

function highlightCurrentPage() {
  /* Add the active class to the link of the current page */
  let currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "" || currentPage === "/") {
    currentPage = "index.html";
  }

  const relatedPages = {
    "register.html": "login.html"
  };

  const pageToHighlight = relatedPages[currentPage] || currentPage;
  const links = document.querySelectorAll("#top-nav a, #side-nav a");

  links.forEach(function(link) {
    const linkPage = link.getAttribute("href").split("/").pop();

    if (linkPage === pageToHighlight) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("keydown", function(event) {
  /* Escape closes open panels */
  if (event.key !== "Escape") {
    return;
  }

  closeSideNav();

  if (typeof closeCart === "function") {
    closeCart();
  }
});

document.addEventListener("DOMContentLoaded", function() {
  /* Run the nav setup after the page is ready */
  const currentUser = window.mockKape ? window.mockKape.getCurrentUser() : null;

  updateTopNavLinks(currentUser);
  updateSideNavLinks(currentUser);
  highlightCurrentPage();
});
