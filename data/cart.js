// Selectors for cart UI elements
const cartContent = document.querySelector(".cart-content");
const cartCountEls = document.querySelectorAll(".js-cart-quantity");
const storageKey = "vexoCartItems";

// Read cart items from localStorage and parse them as JSON.
// Returns an empty array if nothing is stored or parsing fails.
const getCartItems = () => {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
};

// Save cart items back to localStorage and refresh the cart badge.
const saveCartItems = (items) => {
  localStorage.setItem(storageKey, JSON.stringify(items));
  updateCartCount(items);
};

// Update the visible cart quantity badges across the page.
const updateCartCount = (items = getCartItems()) => {
  const count = items.reduce((total, item) => total + (item.quantity || 1), 0);

  cartCountEls.forEach((el) => {
    el.textContent = count;
    if (count > 0) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  });
};

// Recalculate the cart total price from storage and update the summary display.
const updateTotalPrice = () => {
  const totalPriceElement = document.querySelector(".total-price");
  if (!totalPriceElement) return;

  const items = getCartItems();
  const total = items.reduce((sum, item) => {
    const price = parseFloat(item.price.toString().replace("$", "")) || 0;
    return sum + price * item.quantity;
  }, 0);

  totalPriceElement.textContent = `$${total.toFixed(2)}`;
};

// Remove a cart item by ID and refresh the UI/storage.
const removeCartItem = (itemId) => {
  const items = getCartItems().filter((item) => item.id !== itemId);
  saveCartItems(items);
  renderCartItems(items);
};

// Update a cart item's quantity and refresh UI/storage.
const updateCartItemQuantity = (itemId, quantity) => {
  const cartItems = getCartItems();
  const item = cartItems.find((entry) => entry.id === itemId);
  if (!item) return;

  item.quantity = Math.max(1, quantity);
  saveCartItems(cartItems);
  renderCartItems(cartItems);
};

// Render cart items and attach interaction handlers for each item.
const renderCartItems = (items) => {
  if (!cartContent) return;

  cartContent.innerHTML = "";

  if (items.length === 0) {
    cartContent.innerHTML = `
            <div class="card-body">
                <p class="text-center opacity-50">Your cart is empty. Add items from the shop to see them here.</p>
            </div>`;
    updateTotalPrice();
    return;
  }

  items.forEach((item) => {
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.dataset.id = item.id;

    cartBox.innerHTML = `
            <div class="card-body">
                <div class="flex gap-6">
                    <img src="${item.image}" class="w-28 h-28 object-cover rounded">
                    <div class="flex-1">
                        <h2 class="font-bold">${item.title}</h2>
                        <p class="text-gray-500 text-[10px]">Grey • Size M</p>
                        <div class="flex items-center gap-3 mt-4">
                            <button class="decrement btn btn-sm" type="button">-</button>
                            <span class="number">${item.quantity}</span>
                            <button class="increment btn btn-sm" type="button">+</button>
                        </div>
                    </div>
                    <div class="text-right flex flex-col">
                        <p class="font-bold">${item.price}</p>
                        <div>
                            <button class="border-none rounded-full shadow-2xl active:text-blue-900 hover:cursor-pointer" type="button"><i class="fa-solid fa-heart"></i></button>
                            <button class="border-none rounded-full shadow-2xl active:text-blue-900 hover:cursor-pointer cart-remove" type="button"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
                </div>
            </div>`;

    cartContent.appendChild(cartBox);
    //button to increSE AND DECREASE CARt items
    const decrementButton = cartBox.querySelector(".decrement");
    const incrementButton = cartBox.querySelector(".increment");
    const removeButton = cartBox.querySelector(".cart-remove");

    decrementButton.addEventListener("click", () => {
      const newQuantity = item.quantity > 1 ? item.quantity - 1 : 1;
      updateCartItemQuantity(item.id, newQuantity);
    });

    incrementButton.addEventListener("click", () => {
      updateCartItemQuantity(item.id, item.quantity + 1);
    });

    removeButton.addEventListener("click", () => {
      removeCartItem(item.id);
    });
  });

  updateTotalPrice();
};

// Ensure each product has a stable ID, falling back to a random string if needed.
const normalizeProductId = (productBox) => {
  const title = productBox.querySelector(".product-title")?.textContent.trim();
  return title || `product-${Math.random().toString(36).slice(2, 10)}`;
};

// Add a product to the cart, updating quantity for existing items.
const addToCart = (productBox) => {
  const productImgSrc = productBox.querySelector("img")?.src || "";
  const productTitle =
    productBox.querySelector(".product-title")?.textContent.trim() || "Product";
  const productPrice =
    productBox.querySelector(".price")?.textContent.trim() || "$0";
  const productId = normalizeProductId(productBox);

  const cartItems = getCartItems();
  const existingItem = cartItems.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({
      id: productId,
      title: productTitle,
      price: productPrice,
      image: productImgSrc,
      quantity: 1,
    });
  }

  saveCartItems(cartItems);
  renderCartItems(cartItems);
};

// Listen for clicks on "Add to Cart" buttons anywhere in the document.
document.addEventListener("click", (event) => {
  const addButton = event.target.closest(".add-cart");
  if (!addButton) return;

  const productBox = addButton.closest(".product-box");
  if (!productBox) return;

  addToCart(productBox);
});

// Initialize the cart display when the page loads.
window.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCartItems(getCartItems());
});

// Handle the checkout flow when the buy button is clicked.
const buyNowButton = document.querySelector(".checkout");
if (buyNowButton) {
  buyNowButton.addEventListener("click", () => {
    const cartItems = getCartItems();
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items to your cart before buying.");
      return;
    }

    saveCartItems([]);
    renderCartItems([]);
    alert("Thank you for your purchase!");
  });
}
