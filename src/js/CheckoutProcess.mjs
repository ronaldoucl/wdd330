import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {

  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.subtotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculeSubtotal();
    this.calculateTax();
    this.calculateShippingEstimate();
    this.calculateOrderTotal();
    this.updateDOM();
  }

  calculeSubtotal () {

    this.list.forEach(element => {
      this.subtotal = this.subtotal + Number.parseInt(element.FinalPrice);
    });
  }

  calculateTax() {
    this.tax = this.subtotal * 0.06;
  }

  calculateShippingEstimate() {
    let length = this.list.length;
    if(length > 0) {
      this.shipping = 10 + (2 * (length - 1));
    }
  }

  calculateOrderTotal() {
    this.orderTotal = this.subtotal + this.tax + this.shipping;
  }

  updateDOM() {
    document.querySelector(".checkout-summary #subtotal").textContent = "$" + this.subtotal.toFixed(2);
    document.querySelector(".checkout-summary #tax").textContent = "$" + this.tax.toFixed(2);
    document.querySelector(".checkout-summary #shipping").textContent = "$" + this.shipping.toFixed(2);
    document.querySelector(".checkout-summary #order-total").textContent = "$" + this.orderTotal.toFixed(2);
  }
}
