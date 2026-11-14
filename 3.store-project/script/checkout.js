import { bag_cart, remove_from_cart } from "../data/bag_cart.js";
import { products } from "../data/product.js";
import { format_currency } from "./utils/money.js";
const js_checkout_items = document.querySelector(".js-checkout-items");
js_checkout_items.innerHTML = "";

bag_cart.forEach((item) => {
  const product_id = item.product_id;
  const product_quantity = item.quantity;
  let matching_items;
  products.forEach((product) => {
    if (product.id === product_id) {
      matching_items = product;
    }
  });

  js_checkout_items.innerHTML += `
    <article class="checkout-item js-checkout-item-container-${product_id}" data-product-id="${product_id}">
                    <p class="checkout-delivery-date">
                        Delivery date: <time datetime="2026-11-24">Tuesday, November 24</time>
                    </p>

                    <div class="checkout-item-content">
                        <img class="checkout-product-image" src="../${matching_items.image}"
                            alt="${matching_items.name}">

                        <div class="checkout-product-details">
                            <h3 class="checkout-product-name">${matching_items.name}</h3>
                            <p class="checkout-product-price">€${format_currency(matching_items)}</p>

                            <div class="checkout-product-actions">
                                <span>Quantity: <span class="js-item-quantity">${product_quantity}</span></span>
                                <button type="button" class="js-update-quantity">Update</button>
                                <button type="button" class="js-remove-item" data-product-id=${matching_items.id}>Remove</button>
                            </div>
                        </div>

                        <fieldset class="checkout-delivery-options">
                            <legend>Choose a delivery option</legend>

                            <label class="checkout-delivery-option">
                                <input type="radio" name="delivery-option-${matching_items.id}" value="standard" checked>
                                <span>Tuesday, November 24</span>
                                <span>Free shipping</span>
                            </label>

                            <label class="checkout-delivery-option">
                                <input type="radio" name="delivery-option-${matching_items.id}" value="priority">
                                <span>Wednesday, November 18</span>
                                <span>€4.99 shipping</span>
                            </label>

                            <label class="checkout-delivery-option">
                                <input type="radio" name="delivery-option-${matching_items.id}" value="express">
                                <span>Monday, November 16</span>
                                <span>€9.99 shipping</span>
                            </label>
                        </fieldset>
                    </div>
                </article>
    `;
});

const js_remove_item = document.querySelectorAll(".js-remove-item");

js_remove_item.forEach((button) => {
  button.addEventListener("click", () => {
    const product_id = button.dataset.productId;
    const js_checkout_item_container = document.querySelector(
      `.js-checkout-item-container-${product_id}`,
    );
    remove_from_cart(product_id);
    js_checkout_item_container.remove();
    update_bag_cart_quantity();
  });
});

function update_bag_cart_quantity() {
  const js_checkout_item_count = document.querySelector(
    ".js-checkout-item-count",
  );
  let cart_quantity = 0;
  bag_cart.forEach((item) => {
    cart_quantity += item.quantity;
    
  });
  js_checkout_item_count.innerHTML = `(${cart_quantity} item)`;
}
update_bag_cart_quantity();