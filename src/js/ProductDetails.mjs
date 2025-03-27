import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails(this.product);
    document.getElementById("addToCart").addEventListener("click", addProductToCart.bind(this));
  }

  renderProductDetails() {
    const container = document.querySelector("main.divider");
    container.innerHTML = productDetailsTemplate(this.product);
  }
}

function addProductToCart() {
  const cartItems = getLocalStorage("so-cart") || [];
  if(cartItems && cartItems.find(item => item.Id == this.product.Id)) {
    cartItems.forEach(item => {
      if(item.Id == this.product.Id){
        item.quantity = item.quantity + 1;
        item.FinalPrice = item.FinalPrice * item.quantity;
      }
    });
  } else {
    this.product.quantity = 1;
    cartItems.push(this.product);
  }
  setLocalStorage("so-cart", cartItems);
}

function productDetailsTemplate(product) {
  return `
    <section class="product-detail">
        <h2>${product.Brand.Name}</h2>
        <h3 class="divider">Product</h3>
        <img
          src="${product.Images.PrimaryExtraLarge}"
          alt="${product.NameWithoutBrand}"
          id="productImage"
          class="divider"
        />
        <p id="productPrice" class="product-card__price">$${product.FinalPrice}</p>
        <p id="productColor" class="product__color">${product.Colors[0].ColorName}</p>
        <p id="productDesc" class="product__description">${product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
      </section>
  `;
}

