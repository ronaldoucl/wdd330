import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.quantity,
    };
  });
  return simplifiedItems;
}

function formDataToJSON(formElement) {
  // convert the form data to a JSON object
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

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

  async checkout() {
    const formElement = document.forms["checkout"];
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);

    try {
      const response = await services.checkout(order);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  calculeSubtotal() {
    this.list.forEach((element) => {
      this.subtotal = this.subtotal + Number.parseInt(element.FinalPrice);
    });
  }

  calculateTax() {
    this.tax = this.subtotal * 0.06;
  }

  calculateShippingEstimate() {
    let length = this.list.length;
    if (length > 0) {
      this.shipping = 10 + 2 * (length - 1);
    }
  }

  calculateOrderTotal() {
    this.orderTotal = this.subtotal + this.tax + this.shipping;
  }

  updateDOM() {
    document.querySelector(".checkout-summary #num-items").textContent = this.list.length;
    document.querySelector(".checkout-summary #subtotal").textContent =
      "$" + this.subtotal.toFixed(2);
    document.querySelector(".checkout-summary #tax").textContent =
      "$" + this.tax.toFixed(2);
    document.querySelector(".checkout-summary #shipping").textContent =
      "$" + this.shipping.toFixed(2);
    document.querySelector(".checkout-summary #order-total").textContent =
      "$" + this.orderTotal.toFixed(2);
  }
}
