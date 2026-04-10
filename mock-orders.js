/*
  mock-orders.js

  This file is the main storage file of the project.
  Most pages use the functions here to read or save data.
*/

const USERS_KEY = "kantokape_users";
const CURRENT_USER_KEY = "kantokape_current_user_id";
const ORDERS_KEY = "kantokape_orders";
const MENU_KEY = "kantokape_extra_menu_items";
const PENDING_PREFIX = "kantokape_pending_";
const CART_PREFIX = "kantokape_cart_";

/* Main menu items of the project */
const DEFAULT_MENU_ITEMS = [
  {
    id: "menu-001",
    name: "Brewed Coffee",
    price: 59,
    description: "Classic barako blend, black or with milk",
    category: "Hot Drinks",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80"
  },
  {
    id: "menu-002",
    name: "Kapeng Barako",
    price: 75,
    description: "Strong and bold Batangas-style brew",
    category: "Hot Drinks",
    image: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?w=500&q=80"
  },
  {
    id: "menu-003",
    name: "Cafe Latte",
    price: 85,
    description: "Espresso with steamed fresh milk",
    category: "Hot Drinks",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80"
  },
  {
    id: "menu-004",
    name: "Hazelnut Latte",
    price: 90,
    description: "Espresso, steamed milk, hazelnut syrup",
    category: "Hot Drinks",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80"
  },
  {
    id: "menu-005",
    name: "Americano",
    price: 80,
    description: "Double espresso with hot water",
    category: "Hot Drinks",
    image: "https://images.unsplash.com/photo-1494314671902-399b18174975?w=500&q=80"
  },
  {
    id: "menu-006",
    name: "Cappuccino",
    price: 85,
    description: "Equal parts espresso, steamed milk, foam",
    category: "Hot Drinks",
    image: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=500&q=80"
  },
  {
    id: "menu-007",
    name: "Hot Chocolate",
    price: 75,
    description: "Rich and creamy tablea hot choco",
    category: "Non-Coffee",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80"
  },
  {
    id: "menu-008",
    name: "Salabat",
    price: 70,
    description: "Fresh ginger tea with honey",
    category: "Non-Coffee",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80"
  },
  {
    id: "menu-009",
    name: "Calamansi Juice",
    price: 65,
    description: "Warm citrus drink with honey",
    category: "Non-Coffee",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=500&q=80"
  },
  {
    id: "menu-010",
    name: "Iced Americano",
    price: 95,
    description: "Bold espresso over ice",
    category: "Cold Drinks",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80"
  },
  {
    id: "menu-011",
    name: "Iced Caramel Latte",
    price: 105,
    description: "Espresso, milk, caramel drizzle on ice",
    category: "Cold Drinks",
    image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=500&q=80"
  },
  {
    id: "menu-012",
    name: "Cold Brew",
    price: 110,
    description: "12-hour steeped coffee, smooth and rich",
    category: "Cold Drinks",
    image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500&q=80"
  },
  {
    id: "menu-013",
    name: "Spanish Latte",
    price: 100,
    description: "Espresso with condensed milk on ice",
    category: "Cold Drinks",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80"
  },
  {
    id: "menu-014",
    name: "Iced Matcha Latte",
    price: 95,
    description: "Ceremonial grade matcha with fresh milk",
    category: "Cold Drinks",
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=500&q=80"
  },
  {
    id: "menu-015",
    name: "Pandesal",
    price: 55,
    description: "Classic soft bun, fresh every morning",
    category: "Snacks and Pastries",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80"
  },
  {
    id: "menu-016",
    name: "Banana Loaf",
    price: 75,
    description: "Homemade banana bread, lightly toasted",
    category: "Snacks and Pastries",
    image: "https://images.unsplash.com/photo-1605286978633-2dec93ff88a2?w=500&q=80"
  },
  {
    id: "menu-017",
    name: "Ensaymada",
    price: 85,
    description: "Buttery soft roll with cheese topping",
    category: "Snacks and Pastries",
    image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=500&q=80"
  },
  {
    id: "menu-018",
    name: "Egg Pie Slice",
    price: 90,
    description: "Classic Filipino custard egg pie",
    category: "Snacks and Pastries",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=80"
  }
];

function readJson(storage, key, fallbackValue) {
  /* Read saved text and turn it back into JS data */
  const rawValue = storage.getItem(key);

  if (!rawValue) {
    return fallbackValue;
  }

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    return fallbackValue;
  }
}

function saveJson(storage, key, value) {
  /* Save JS data as text in localStorage */
  storage.setItem(key, JSON.stringify(value));
}

function createId(prefix) {
  /* Make a simple unique id */
  return prefix + "-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}

function getUsers() {
  return readJson(localStorage, USERS_KEY, []);
}

function saveUsers(users) {
  saveJson(localStorage, USERS_KEY, users);
}

function getOrders() {
  return readJson(localStorage, ORDERS_KEY, []);
}

function saveOrders(orders) {
  saveJson(localStorage, ORDERS_KEY, orders);
}

function getOrderByNumber(orderNumber) {
  /* Find one order using its order number */
  return getOrders().find(function(order) {
    return order.orderNumber === orderNumber;
  }) || null;
}

function getMenuItems() {
  return readJson(localStorage, MENU_KEY, []);
}

function saveMenuItems(items) {
  saveJson(localStorage, MENU_KEY, items);
}

function ensureMenuItemsSeeded() {
  /* Put the default menu into storage the first time */
  const savedItems = readJson(localStorage, MENU_KEY, null);

  if (!savedItems || !savedItems.length) {
    saveMenuItems(DEFAULT_MENU_ITEMS.slice());
    return;
  }

  /* If old saved data is missing some default items, add them back */
  const savedNames = savedItems.map(function(item) {
    return item.name;
  });

  const missingDefaults = DEFAULT_MENU_ITEMS.filter(function(item) {
    return !savedNames.includes(item.name);
  });

  if (missingDefaults.length) {
    saveMenuItems(savedItems.concat(missingDefaults));
  }
}

function getCurrentUserId() {
  return localStorage.getItem(CURRENT_USER_KEY) || "";
}

function saveCurrentUserId(userId) {
  localStorage.setItem(CURRENT_USER_KEY, userId);
}

function getUserById(userId) {
  return getUsers().find(function(user) {
    return user.id === userId;
  }) || null;
}

function getUserByEmail(email) {
  const cleanEmail = String(email || "").toLowerCase();

  return getUsers().find(function(user) {
    return String(user.email).toLowerCase() === cleanEmail;
  }) || null;
}

function getCurrentUser() {
  /* Get the full user object of the account that is signed in now */
  const userId = getCurrentUserId();

  if (!userId) {
    return null;
  }

  return getUserById(userId);
}

function getCartKey(userId) {
  /* Each user has their own cart key */
  return CART_PREFIX + userId;
}

function getPendingKey(userId) {
  /* Each user has their own checkout key */
  return PENDING_PREFIX + userId;
}

function getCurrentCart() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return [];
  }

  return readJson(localStorage, getCartKey(currentUser.id), []);
}

function saveCurrentCart(items) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return;
  }

  saveJson(localStorage, getCartKey(currentUser.id), items);
}

function clearCurrentCart() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return;
  }

  localStorage.removeItem(getCartKey(currentUser.id));
}

function getPendingCheckout() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return null;
  }

  return readJson(localStorage, getPendingKey(currentUser.id), null);
}

function savePendingCheckout(pendingData) {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return;
  }

  saveJson(localStorage, getPendingKey(currentUser.id), pendingData);
}

function clearPendingCheckout() {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return;
  }

  localStorage.removeItem(getPendingKey(currentUser.id));
}

function calculateTotal(items) {
  /* Add all item totals together */
  return items.reduce(function(total, item) {
    return total + (item.price * item.qty);
  }, 0);
}

function formatPrice(amount) {
  return "PHP " + amount;
}

function startCheckoutFromCurrentCart() {
  /* Copy the cart into a pending checkout record */
  const items = getCurrentCart();

  if (!items.length) {
    return null;
  }

  const pendingData = {
    items: items,
    total: calculateTotal(items),
    createdAt: new Date().toLocaleString()
  };

  savePendingCheckout(pendingData);
  return pendingData;
}

function getPreviewOrderNumber() {
  /* Show the next order number before saving the real order */
  return "KKH-" + String(1001 + getOrders().length);
}

function getStatusSteps(orderType) {
  /* Pickup and delivery do not use the same steps */
  if (orderType === "pickup") {
    return ["Preparing", "Ready for Pickup", "Claimed"];
  }

  return ["Preparing", "Ready for Delivery", "On the Way", "Delivered"];
}

function createOrder(orderType, extraDetails) {
  /*
    This saves the final order.
    It uses the pending checkout plus extra details from the page.
  */
  const currentUser = getCurrentUser();
  const pendingData = getPendingCheckout();

  if (!currentUser || !pendingData || !pendingData.items || !pendingData.items.length) {
    return null;
  }

  const customerDetails = extraDetails && extraDetails.customer
    ? extraDetails.customer
    : {
        fullName: currentUser.fullName,
        email: currentUser.email,
        phone: currentUser.phone
      };

  const newOrder = {
    orderNumber: getPreviewOrderNumber(),
    userId: currentUser.id,
    type: orderType,
    status: "Preparing",
    createdAt: new Date().toLocaleString(),
    customer: customerDetails,
    items: pendingData.items,
    total: pendingData.total,
    notes: extraDetails && extraDetails.notes ? extraDetails.notes : "",
    deliveryDetails: extraDetails && extraDetails.deliveryDetails ? extraDetails.deliveryDetails : null,
    riderName: "",
    paymentLabel: "Paid"
  };

  const nextOrders = [newOrder].concat(getOrders());

  /* Save the order, then clear the temporary cart/checkout data */
  saveOrders(nextOrders);
  clearPendingCheckout();
  clearCurrentCart();

  return newOrder;
}

function updateOrderStatus(orderNumber, newStatus) {
  /* Find one order and replace its status */
  const nextOrders = getOrders().map(function(order) {
    if (order.orderNumber === orderNumber) {
      order.status = newStatus;
    }

    return order;
  });

  saveOrders(nextOrders);
}

function markDeliveryAsDelivered(orderNumber) {
  /*
    This is used by the rider page.
    It only works for delivery orders that are already on the way.
  */
  const order = getOrderByNumber(orderNumber);

  if (!order) {
    return {
      ok: false,
      message: "Order number not found."
    };
  }

  if (order.type !== "delivery") {
    return {
      ok: false,
      message: "This order is not a delivery order."
    };
  }

  if (!order.riderName) {
    return {
      ok: false,
      message: "Please assign a rider first."
    };
  }

  if (order.status !== "On the Way") {
    return {
      ok: false,
      message: "This order must be On the Way first."
    };
  }

  if (order.status === "Delivered") {
    return {
      ok: false,
      message: "This order is already marked as delivered."
    };
  }

  updateOrderStatus(orderNumber, "Delivered");

  return {
    ok: true
  };
}

function assignRider(orderNumber, riderName) {
  /* Save the rider name inside one order */
  const nextOrders = getOrders().map(function(order) {
    if (order.orderNumber === orderNumber) {
      order.riderName = riderName;
    }

    return order;
  });

  saveOrders(nextOrders);
}

function deleteOrder(orderNumber) {
  /* Remove one order from the list */
  const nextOrders = getOrders().filter(function(order) {
    return order.orderNumber !== orderNumber;
  });

  saveOrders(nextOrders);
}

function getOrdersForCurrentUser() {
  /* Show only the orders of the signed in user */
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return [];
  }

  return getOrders().filter(function(order) {
    return order.userId === currentUser.id;
  });
}

function registerUser(userData) {
  /* Create a new customer account and sign it in right away */
  const cleanEmail = String(userData.email || "").toLowerCase();

  if (getUserByEmail(cleanEmail)) {
    return {
      ok: false,
      message: "That email is already registered."
    };
  }

  const newUser = {
    id: createId("user"),
    fullName: userData.fullName,
    email: cleanEmail,
    phone: userData.phone,
    password: userData.password,
    role: "customer"
  };

  const nextUsers = getUsers().concat(newUser);
  saveUsers(nextUsers);
  saveCurrentUserId(newUser.id);

  return {
    ok: true,
    user: newUser
  };
}

function loginUser(email, password) {
  /* Check if the email and password match a saved user */
  const foundUser = getUserByEmail(email);

  if (!foundUser || foundUser.password !== password) {
    return {
      ok: false,
      message: "Wrong email or password."
    };
  }

  saveCurrentUserId(foundUser.id);

  return {
    ok: true,
    user: foundUser
  };
}

function logoutUser() {
  /* Remove the saved sign-in id */
  localStorage.removeItem(CURRENT_USER_KEY);
}

function updateCurrentUser(userData) {
  /* Edit the currently signed in account */
  const currentUser = getCurrentUser();
  const cleanEmail = String(userData.email || "").toLowerCase();

  if (!currentUser) {
    return {
      ok: false,
      message: "Please sign in first."
    };
  }

  const hasSameEmailFromOtherUser = getUsers().some(function(user) {
    return user.id !== currentUser.id && String(user.email).toLowerCase() === cleanEmail;
  });

  if (hasSameEmailFromOtherUser) {
    return {
      ok: false,
      message: "That email is already being used by another account."
    };
  }

  const nextUsers = getUsers().map(function(user) {
    if (user.id !== currentUser.id) {
      return user;
    }

    return {
      id: user.id,
      fullName: userData.fullName,
      email: cleanEmail,
      phone: userData.phone,
      password: userData.password || user.password,
      role: user.role
    };
  });

  const updatedUser = nextUsers.find(function(user) {
    return user.id === currentUser.id;
  });

  /* Keep old orders updated with the new customer details */
  const nextOrders = getOrders().map(function(order) {
    if (order.userId !== currentUser.id) {
      return order;
    }

    order.customer.fullName = updatedUser.fullName;
    order.customer.email = updatedUser.email;
    order.customer.phone = updatedUser.phone;
    return order;
  });

  saveUsers(nextUsers);
  saveOrders(nextOrders);

  return {
    ok: true,
    user: updatedUser
  };
}

function deleteCurrentUser() {
  /* Delete the signed in customer account and its saved data */
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return {
      ok: false,
      message: "Please sign in first."
    };
  }

  if (currentUser.role === "admin") {
    return {
      ok: false,
      message: "The main admin account cannot be deleted."
    };
  }

  const nextUsers = getUsers().filter(function(user) {
    return user.id !== currentUser.id;
  });

  const nextOrders = getOrders().filter(function(order) {
    return order.userId !== currentUser.id;
  });

  saveUsers(nextUsers);
  saveOrders(nextOrders);
  localStorage.removeItem(getCartKey(currentUser.id));
  localStorage.removeItem(getPendingKey(currentUser.id));
  logoutUser();

  return {
    ok: true
  };
}

function updateUserByAdmin(userId, userData) {
  /* Admin version of editing a user */
  const targetUser = getUserById(userId);
  const cleanEmail = String(userData.email || "").toLowerCase();

  if (!targetUser) {
    return {
      ok: false,
      message: "User account not found."
    };
  }

  const hasSameEmailFromOtherUser = getUsers().some(function(user) {
    return user.id !== userId && String(user.email).toLowerCase() === cleanEmail;
  });

  if (hasSameEmailFromOtherUser) {
    return {
      ok: false,
      message: "That email is already being used by another account."
    };
  }

  const nextUsers = getUsers().map(function(user) {
    if (user.id !== userId) {
      return user;
    }

    return {
      id: user.id,
      fullName: userData.fullName,
      email: cleanEmail,
      phone: userData.phone,
      password: userData.password || user.password,
      role: user.role
    };
  });

  const updatedUser = nextUsers.find(function(user) {
    return user.id === userId;
  });

  /* Update old orders too so the new name/email shows there */
  const nextOrders = getOrders().map(function(order) {
    if (order.userId !== userId) {
      return order;
    }

    order.customer.fullName = updatedUser.fullName;
    order.customer.email = updatedUser.email;
    order.customer.phone = updatedUser.phone;
    return order;
  });

  saveUsers(nextUsers);
  saveOrders(nextOrders);

  return {
    ok: true,
    user: updatedUser
  };
}

function deleteUserByAdmin(userId) {
  /* Admin version of deleting a user */
  const targetUser = getUserById(userId);
  const currentUser = getCurrentUser();

  if (!targetUser) {
    return {
      ok: false,
      message: "User account not found."
    };
  }

  if (targetUser.role === "admin") {
    return {
      ok: false,
      message: "The main admin account cannot be deleted."
    };
  }

  const nextUsers = getUsers().filter(function(user) {
    return user.id !== userId;
  });

  const nextOrders = getOrders().filter(function(order) {
    return order.userId !== userId;
  });

  saveUsers(nextUsers);
  saveOrders(nextOrders);
  localStorage.removeItem(getCartKey(userId));
  localStorage.removeItem(getPendingKey(userId));

  if (currentUser && currentUser.id === userId) {
    logoutUser();
  }

  return {
    ok: true
  };
}

function addMenuItem(itemData) {
  /* Add one new menu item */
  const newItem = {
    id: createId("menu"),
    name: itemData.name,
    price: Number(itemData.price),
    description: itemData.description,
    category: itemData.category || "Menu Items",
    image: itemData.image || "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80"
  };

  const nextItems = [newItem].concat(getMenuItems());
  saveMenuItems(nextItems);

  return newItem;
}

function updateMenuItem(itemId, itemData) {
  /* Edit one menu item */
  const items = getMenuItems();
  const targetItem = items.find(function(item) {
    return item.id === itemId;
  });

  if (!targetItem) {
    return {
      ok: false,
      message: "Menu item not found."
    };
  }

  const nextItems = items.map(function(item) {
    if (item.id !== itemId) {
      return item;
    }

    return {
      id: item.id,
      name: itemData.name,
      price: Number(itemData.price),
      description: itemData.description,
      category: itemData.category || "Menu Items",
      image: itemData.image || item.image
    };
  });

  saveMenuItems(nextItems);

  return {
    ok: true
  };
}

function deleteMenuItem(itemId) {
  /* Remove one menu item */
  const nextItems = getMenuItems().filter(function(item) {
    return item.id !== itemId;
  });

  saveMenuItems(nextItems);
}

function renderSummaryItems(items, targetElement) {
  /* Print the order summary rows into the page */
  if (!targetElement) {
    return;
  }

  if (!items || !items.length) {
    targetElement.innerHTML = '<p class="empty-copy">No items yet.</p>';
    return;
  }

  const html = items.map(function(item) {
    return '' +
      '<div class="summary-row">' +
        '<div>' +
          '<strong>' + item.name + '</strong>' +
          '<span>Qty ' + item.qty + '</span>' +
        '</div>' +
        '<span>' + formatPrice(item.price * item.qty) + '</span>' +
      '</div>';
  }).join("");

  targetElement.innerHTML = html;
}

function renderStatusTrack(order, targetElement) {
  /* Print the step tracker used by orders/admin pages */
  if (!targetElement || !order) {
    return;
  }

  const steps = getStatusSteps(order.type);
  const activeIndex = steps.indexOf(order.status);

  const html = steps.map(function(step, index) {
    let stateClass = "status-step";

    if (index < activeIndex) {
      stateClass += " done";
    } else if (index === activeIndex) {
      stateClass += " active";
    }

    return '' +
      '<div class="' + stateClass + '">' +
        '<span class="step-dot"></span>' +
        '<strong>' + step + '</strong>' +
      '</div>';
  }).join("");

  targetElement.innerHTML = html;
}

function seedUsers() {
  /* Add sample users only if storage is still empty */
  if (localStorage.getItem(USERS_KEY)) {
    return;
  }

  saveUsers([
    {
      id: "admin-001",
      fullName: "Kape Kanto Admin",
      email: "admin@kapekanto.com",
      phone: "0917 900 0000",
      password: "admin123",
      role: "admin"
    },
    {
      id: "user-001",
      fullName: "Juan Dela Cruz",
      email: "juan@email.com",
      phone: "0917 123 4567",
      password: "123456",
      role: "customer"
    },
    {
      id: "user-002",
      fullName: "Maria Santos",
      email: "maria@email.com",
      phone: "0918 222 3333",
      password: "123456",
      role: "customer"
    }
  ]);
}

function seedMenuItems() {
  /* Add default menu items only if needed */
  ensureMenuItemsSeeded();
}

function seedOrders() {
  /* Add sample orders only if storage is still empty */
  if (localStorage.getItem(ORDERS_KEY)) {
    return;
  }

  saveOrders([
    {
      orderNumber: "KKH-1001",
      userId: "user-001",
      type: "delivery",
      status: "On the Way",
      createdAt: new Date().toLocaleString(),
      customer: {
        fullName: "Juan Dela Cruz",
        email: "juan@email.com",
        phone: "0917 123 4567"
      },
      items: [
        { name: "Cafe Latte", price: 85, qty: 1 },
        { name: "Banana Loaf", price: 75, qty: 1 }
      ],
      total: 160,
      notes: "Near the tricycle terminal",
      deliveryDetails: {
        address: "Lot 12 Block 3 Rose Street",
        barangay: "San Isidro",
        city: "Cainta, Rizal",
        landmark: "Near the tricycle terminal"
      },
      riderName: "Rider Joel",
      paymentLabel: "Paid"
    },
    {
      orderNumber: "KKH-1002",
      userId: "user-002",
      type: "pickup",
      status: "Ready for Pickup",
      createdAt: new Date().toLocaleString(),
      customer: {
        fullName: "Maria Santos",
        email: "maria@email.com",
        phone: "0918 222 3333"
      },
      items: [
        { name: "Iced Americano", price: 95, qty: 1 },
        { name: "Pandesal", price: 55, qty: 1 }
      ],
      total: 150,
      notes: "",
      deliveryDetails: null,
      riderName: "",
      paymentLabel: "Paid"
    }
  ]);
}

function seedData() {
  /* Run all starter data functions */
  seedUsers();
  seedMenuItems();
  seedOrders();
}

/* Run starter data when the file loads */
seedData();

/* Make these functions available to the HTML pages */
window.mockKape = {
  getUsers: getUsers,
  getCurrentUser: getCurrentUser,
  getCurrentUserId: getCurrentUserId,
  loginUser: loginUser,
  registerUser: registerUser,
  logoutUser: logoutUser,
  updateCurrentUser: updateCurrentUser,
  deleteCurrentUser: deleteCurrentUser,
  updateUserByAdmin: updateUserByAdmin,
  deleteUserByAdmin: deleteUserByAdmin,
  getCurrentCart: getCurrentCart,
  saveCurrentCart: saveCurrentCart,
  clearCurrentCart: clearCurrentCart,
  startCheckoutFromCurrentCart: startCheckoutFromCurrentCart,
  getPendingCheckout: getPendingCheckout,
  clearPendingCheckout: clearPendingCheckout,
  getOrders: getOrders,
  getOrderByNumber: getOrderByNumber,
  getOrdersForCurrentUser: getOrdersForCurrentUser,
  createOrder: createOrder,
  updateOrderStatus: updateOrderStatus,
  markDeliveryAsDelivered: markDeliveryAsDelivered,
  assignRider: assignRider,
  deleteOrder: deleteOrder,
  getPreviewOrderNumber: getPreviewOrderNumber,
  formatPrice: formatPrice,
  getMenuItems: getMenuItems,
  addMenuItem: addMenuItem,
  updateMenuItem: updateMenuItem,
  deleteMenuItem: deleteMenuItem,
  renderSummaryItems: renderSummaryItems,
  renderStatusTrack: renderStatusTrack
};
