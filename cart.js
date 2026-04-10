/*
  cart.js

  This file controls the cart.
  It loads the cart, updates item quantity,
  and shows the cart on the page.
*/

let cartItems = [];

function loadCartFromAccount() {
  /* Read the saved cart of the signed in user */
  if (!window.mockKape) {
    return;
  }

  cartItems = window.mockKape.getCurrentCart();
}

function saveCartToAccount() {
  /* Save the current cart back into localStorage */
  if (!window.mockKape) {
    return;
  }

  window.mockKape.saveCurrentCart(cartItems);
}

function openCart() {
  /* Show the cart drawer */
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("overlay").classList.add("visible");
}

function closeCart() {
  /* Hide the cart drawer */
  document.getElementById("cart-drawer").classList.remove("open");

  if (!document.getElementById("side-nav").classList.contains("open")) {
    document.getElementById("overlay").classList.remove("visible");
  }
}

function findCartItem(itemName) {
  /* Look for one item by name */
  return cartItems.find(function(item) {
    return item.name === itemName;
  });
}

function addToCart(name, price) {
  /*
    If the item is already in the cart, increase its quantity.
    If not, add it as a new item.
  */
  const currentUser = window.mockKape ? window.mockKape.getCurrentUser() : null;

  if (!currentUser) {
    alert("Please sign in first so your cart and orders stay under your account.");
    window.location.href = "login.html";
    return;
  }

  const savedItem = findCartItem(name);

  if (savedItem) {
    savedItem.qty += 1;
  } else {
    cartItems.push({ name: name, price: price, qty: 1 });
  }

  saveCartToAccount();
  renderCart();
  updateCartCount();
}

function changeQty(name, change) {
  /* Increase or decrease the quantity of one item */
  const savedItem = findCartItem(name);

  if (!savedItem) {
    return;
  }

  savedItem.qty += change;

  if (savedItem.qty <= 0) {
    cartItems = cartItems.filter(function(item) {
      return item.name !== name;
    });
  }

  saveCartToAccount();
  renderCart();
  updateCartCount();
}

function buildCartRows() {
  /* Turn cart items into HTML rows */
  return cartItems.map(function(item) {
    return '' +
      '<div class="cart-item">' +
        '<div class="cart-item-name">' + item.name + '</div>' +
        '<div class="cart-item-price">PHP ' + item.price + ' each</div>' +
        '<div class="cart-qty">' +
          '<button onclick="changeQty(\'' + item.name + '\', -1)">-</button>' +
          '<span>' + item.qty + '</span>' +
          '<button onclick="changeQty(\'' + item.name + '\', 1)">+</button>' +
        '</div>' +
      '</div>';
  }).join("");
}

function renderCart() {
  /* Show the cart items and the total price */
  const listBox = document.getElementById("cart-items-list");
  const emptyText = document.getElementById("cart-empty-msg");
  const totalBox = document.getElementById("cart-total-amount");

  if (!listBox || !totalBox) {
    return;
  }

  listBox.innerHTML = "";

  if (!cartItems.length) {
    if (emptyText) {
      emptyText.style.display = "block";
    }

    totalBox.textContent = "PHP 0";
    return;
  }

  if (emptyText) {
    emptyText.style.display = "none";
  }

  const total = cartItems.reduce(function(sum, item) {
    return sum + (item.price * item.qty);
  }, 0);

  listBox.innerHTML = buildCartRows();
  totalBox.textContent = "PHP " + total;
}

function updateCartCount() {
  /* Show the total item count in the cart badge */
  const badge = document.getElementById("cart-count");

  if (!badge) {
    return;
  }

  const count = cartItems.reduce(function(sum, item) {
    return sum + item.qty;
  }, 0);

  badge.textContent = count;
}

function goToCheckout() {
  /* Open checkout only if the user has items in the cart */
  const currentUser = window.mockKape ? window.mockKape.getCurrentUser() : null;

  if (!currentUser) {
    alert("Please sign in first.");
    window.location.href = "login.html";
    return;
  }

  if (!cartItems.length) {
    alert("Your cart is still empty. Add a few drinks first.");
    return;
  }

  window.location.href = "checkout.html";
}

document.addEventListener("DOMContentLoaded", function() {
  /* Load and show the cart when the page opens */
  loadCartFromAccount();
  renderCart();
  updateCartCount();
});
