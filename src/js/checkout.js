import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkOutInformation = new CheckoutProcess("so-cart", "checkout-summary");
checkOutInformation.init();
