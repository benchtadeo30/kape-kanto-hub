/*
  ============================================
  KANTO KAPE HUB - cart.js

  What this file does:
    1. Stores all cart items in an array
    2. Opens and closes the cart drawer
    3. Adds items when Add button is clicked
    4. Changes quantity with + and - buttons
    5. Recalculates the total every time
    6. Updates the cart count badge
    7. Takes user to checkout page
  ============================================
*/

/* This array stores all added items.
   Each item looks like: { name, price, qty }
   It resets when the page is refreshed. */
var cartItems = [];

/* Opens the cart drawer */
function openCart() {
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("overlay").classList.add("visible");
}

/* Closes the cart drawer */
function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  if (!document.getElementById("side-nav").classList.contains("open")) {
    document.getElementById("overlay").classList.remove("visible");
  }
}

/* Called when the Add button is clicked on a menu item */
function addToCart(name, price) {

  /* Check if item is already in the cart */
  var found = null;
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].name === name) {
      found = cartItems[i];
      break;
    }
  }

  if (found) {
    found.qty = found.qty + 1;
  } else {
    cartItems.push({ name: name, price: price, qty: 1 });
  }

  renderCart();
  updateCartCount();
}

/* Called by the + and - buttons inside the cart */
function changeQty(name, change) {
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].name === name) {
      cartItems[i].qty = cartItems[i].qty + change;
      if (cartItems[i].qty <= 0) {
        cartItems.splice(i, 1);
      }
      break;
    }
  }
  renderCart();
  updateCartCount();
}

/* Rebuilds the cart item list in the HTML */
function renderCart() {
  var list   = document.getElementById("cart-items-list");
  var empty  = document.getElementById("cart-empty-msg");
  var total  = document.getElementById("cart-total-amount");

  list.innerHTML = "";

  if (cartItems.length === 0) {
    empty.style.display = "block";
    total.textContent = "₱0";
    return;
  }

  if(empty){
     empty.style.display = "none";
  }

  var sum = 0;

  for (var i = 0; i < cartItems.length; i++) {
    var item = cartItems[i];
    sum = sum + (item.price * item.qty);

    list.innerHTML += 
      '<div class="cart-item">' +
        '<div class="cart-item-name">' + item.name + '</div>' +
        '<div class="cart-item-price">₱' + item.price + ' each</div>' +
        '<div class="cart-qty">' +
          '<button onclick="changeQty(\'' + item.name + '\', -1)">-</button>' +
          '<span>' + item.qty + '</span>' +
          '<button onclick="changeQty(\'' + item.name + '\', 1)">+</button>' +
        '</div>' +
      '</div>';
  }

  total.textContent = "₱" + sum;
}

/* Updates the number badge on the Cart button */
function updateCartCount() {
  var count = 0;
  for (var i = 0; i < cartItems.length; i++) {
    count = count + cartItems[i].qty;
  }
  var badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
}

/* Saves cart to sessionStorage and goes to checkout page */
function goToCheckout() {
  if (cartItems.length === 0) {
    alert("Your cart is still empty. Add a few drinks first.");
    return;
  }
  /* Save cart so checkout.html can read it */
  sessionStorage.setItem("kantokape_cart", JSON.stringify(cartItems));
  window.location.href = "checkout.html";
}

