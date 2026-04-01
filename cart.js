/*
  ====================================================
  KANTO KAPE HUB — cart.js
  Written by: Katrina Buenafe

  Handles:
    1. Opening and closing the cart drawer
    2. Adding items to the cart
    3. Changing item quantity (+ and -)
    4. Removing items when quantity reaches 0
    5. Updating the total price
    6. Updating the cart count badge
    7. Opening the checkout modal
    8. Confirming the order (static — no backend)
  ====================================================
*/


/* ====================================================
   CART DATA
   This array holds all the items in the cart.
   Each item looks like: { name, price, qty }
   It resets when the page is refreshed — fully static.
==================================================== */
var cartItems = [];


/* ====================================================
   OPEN CART DRAWER
   Called when the cart button in the top nav is clicked.
==================================================== */
function openCart() {
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("overlay").classList.add("visible");
}


/* ====================================================
   CLOSE CART DRAWER
==================================================== */
function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  /* Only remove overlay if side nav is also closed */
  if (!document.getElementById("side-nav").classList.contains("open")) {
    document.getElementById("overlay").classList.remove("visible");
  }
}


/* ====================================================
   ADD TO CART
   Called when an "Add" button is clicked on the menu.
   Receives the item name and price as arguments.
==================================================== */
function addToCart(name, price) {

  /* Check if this item is already in the cart */
  var existingItem = null;
  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].name === name) {
      existingItem = cartItems[i];
      break;
    }
  }

  if (existingItem) {
    /* Item already exists — just increase the quantity */
    existingItem.qty = existingItem.qty + 1;
  } else {
    /* New item — add it to the array */
    cartItems.push({ name: name, price: price, qty: 1 });
  }

  /* Refresh the cart display */
  renderCart();
  updateCartCount();

  /* Open the cart drawer so the user sees the item was added */
  openCart();
}


/* ====================================================
   CHANGE QUANTITY
   Called by the + and - buttons inside the cart.
   change = 1 means add one, change = -1 means remove one.
==================================================== */
function changeQty(name, change) {

  for (var i = 0; i < cartItems.length; i++) {
    if (cartItems[i].name === name) {

      cartItems[i].qty = cartItems[i].qty + change;

      /* If quantity reaches 0, remove the item from the array */
      if (cartItems[i].qty <= 0) {
        cartItems.splice(i, 1);
      }
      break;
    }
  }

  renderCart();
  updateCartCount();
}


/* ====================================================
   RENDER CART
   Rebuilds the cart item list in the drawer HTML.
   Called every time the cart changes.
==================================================== */
function renderCart() {
  var listEl = document.getElementById("cart-items-list");
  var emptyMsg = document.getElementById("cart-empty-msg");
  var totalEl = document.getElementById("cart-total-amount");

  /* Clear old items */
  listEl.innerHTML = "";

  if (cartItems.length === 0) {
    /* Show empty message */
    emptyMsg.style.display = "block";
    totalEl.textContent = "₱0";
    return;
  }

  /* Hide empty message */
  if(emptyMsg){
    emptyMsg.style.display = "none";
  }
  var total = 0;

  /* Loop through each item and build its HTML */
  for (var i = 0; i < cartItems.length; i++) {
    var item = cartItems[i];
    var itemTotal = item.price * item.qty;
    total = total + itemTotal;

    /* Build the cart item HTML as a string */
    var html = '<div class="cart-item">';
    html += '  <div class="cart-item-name">' + item.name + '</div>';
    html += '  <div class="cart-item-price">₱' + item.price + ' each</div>';
    html += '  <div class="cart-qty">';
    html += '    <button onclick="changeQty(\'' + item.name + '\', -1)">-</button>';
    html += '    <span>' + item.qty + '</span>';
    html += '    <button onclick="changeQty(\'' + item.name + '\', 1)">+</button>';
    html += '  </div>';
    html += '</div>';

    /* Add the HTML to the list */
    listEl.innerHTML = listEl.innerHTML + html;
  }

  /* Update the total */
  totalEl.textContent = "₱" + total;
}


/* ====================================================
   UPDATE CART COUNT BADGE
   Shows the total number of items on the cart button.
==================================================== */
function updateCartCount() {
  var total = 0;
  for (var i = 0; i < cartItems.length; i++) {
    total = total + cartItems[i].qty;
  }
  document.getElementById("cart-count").textContent = total;
}


/* ====================================================
   OPEN CHECKOUT MODAL
   Shows the order summary popup when Checkout is clicked.
==================================================== */
function openCheckout() {

  /* Don't open if cart is empty */
  if (cartItems.length === 0) {
    alert("Your cart is empty. Please add some items first.");
    return;
  }

  var summaryEl = document.getElementById("checkout-summary");
  var totalEl   = document.getElementById("checkout-total-price");

  summaryEl.innerHTML = "";
  var grandTotal = 0;

  /* Build the order summary list */
  for (var i = 0; i < cartItems.length; i++) {
    var item = cartItems[i];
    var itemTotal = item.price * item.qty;
    grandTotal = grandTotal + itemTotal;

    var html = '<div class="checkout-summary-item">';
    html += item.name + ' x' + item.qty;
    html += '<span>₱' + itemTotal + '</span>';
    html += '</div>';

    summaryEl.innerHTML = summaryEl.innerHTML + html;
  }

  totalEl.textContent = "₱" + grandTotal;

  /* Show the modal */
  document.getElementById("checkout-modal-overlay").classList.add("visible");
}


/* ====================================================
   CLOSE CHECKOUT MODAL
==================================================== */
function closeCheckout() {
  document.getElementById("checkout-modal-overlay").classList.remove("visible");
}


/* ====================================================
   CONFIRM ORDER
   Static — just shows a thank you alert and clears cart.
   For Finals: this will connect to a real backend.
==================================================== */
function confirmOrder() {
  closeCheckout();
  closeCart();

  /* Clear the cart */
  cartItems = [];
  renderCart();
  updateCartCount();

  /* Show confirmation */
  alert("Thank you for your order! We will have it ready for you. This is a concept website so no real order was placed.");
}
