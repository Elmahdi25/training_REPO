import { bag_cart, remove_from_cart } from "../data/bag_cart.js";
import { products } from "../data/product.js";
import { format_currency } from "./utils/money.js";
import { calculate_bag_cart_quantity } from "../data/bag_cart.js";

import { save_to_stotage } from "../data/bag_cart.js";
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
                                <span>Quantity: <span class="js-item-quantity-${product_id}">${product_quantity}</span></span>
                                <button type="button" class="js-update-quantity" data-product-id="${matching_items.id}">Update</button>
                                

                                <input class="checkout-quantity-input js-checkout-quantity-input-${product_id}" type="number" 
                                aria-label="Quantity for ${matching_items.name}"
                                value="${product_quantity}" hidden>
                                <button type="button" class="save-quantity-link js-save-quantity-link-${product_id}" hidden>Save</button>
                              

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
  const cart_quantity = calculate_bag_cart_quantity();

  js_checkout_item_count.innerHTML = `(${cart_quantity} item)`;
}
update_bag_cart_quantity();

const js_update_quantity = document.querySelectorAll(`.js-update-quantity`);

js_update_quantity.forEach((button) => {
  const product_id = button.dataset.productId;
  const js_checkout_quantity_input = document.querySelector(
    `.js-checkout-quantity-input-${product_id}`,
  );
  const js_save_quantity_link = document.querySelector(
    `.js-save-quantity-link-${product_id}`,
  );
  const js_item_quantity = document.querySelector(
    `.js-item-quantity-${product_id}`,
  );

  button.addEventListener("click", () => {
    js_checkout_quantity_input.hidden = false;
    js_save_quantity_link.hidden = false;
  });

  js_save_quantity_link.addEventListener("click", () => {
    const new_quantity = Number(js_checkout_quantity_input.value);
    let cart_quantity = 0;
    bag_cart.forEach((item) => {
      if (product_id === item.product_id) {
        cart_quantity = new_quantity;
        item.quantity = cart_quantity;
        js_item_quantity.innerHTML = item.quantity;
        update_bag_cart_quantity();
      }
    });
    js_checkout_quantity_input.hidden = true;
    js_save_quantity_link.hidden = true;
    save_to_stotage();
  });
});
