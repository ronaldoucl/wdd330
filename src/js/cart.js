import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

/**
 * Report Task W02 and W04: Ronaldo Campos
 * Empty Card Error: cart.html
 * Total$ in Cart
 */
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  const productList = document.querySelector(".product-list");
  const cartTotal = document.querySelector(".cart-total");
  const checkoutButton = document.querySelector(".checkout-buttom");

  if (cartItems && cartItems.length) {
    productList.innerHTML = cartItems.map(cartItemTemplate).join("");

    const totalPrice = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    cartTotal.textContent = `Total: $${totalPrice.toFixed(2)}`;
    cartTotal.classList.remove("hide");
    checkoutButton.style.display = "block";
  } else {
    productList.innerHTML = "<li>The cart is empty</li>";
    cartTotal.classList.add("hide");
    checkoutButton.style.display = "none";
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryExtraLarge}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
</li>`;

  return newItem;
}

renderCartContents();
loadHeaderFooter();
