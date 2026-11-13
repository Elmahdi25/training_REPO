import { bag_cart } from "../data/bag_cart.js";
import { products } from "../data/product.js";

const js_checkout_items = document.querySelector(".js-checkout-items");
js_checkout_items.innerHTML = "";
bag_cart.forEach((item) => {
  const product_id = item.product_id;
  const product_quantity = item.quantity
  let matching_items;
  products.forEach((product) => {
    if (product.id === product_id) {
      matching_items = product;
    }
  });

  
  js_checkout_items.innerHTML += `
    <article class="checkout-item" data-product-id="${product_id}">
                    <p class="checkout-delivery-date">
                        Delivery date: <time datetime="2026-11-24">Tuesday, November 24</time>
                    </p>

                    <div class="checkout-item-content">
                        <img class="checkout-product-image" src="../${matching_items.image}"
                            alt="${matching_items.name}">

                        <div class="checkout-product-details">
                            <h3 class="checkout-product-name">${matching_items.name}</h3>
                            <p class="checkout-product-price">€${(matching_items.priceCents / 100).toFixed(2)}</p>

                            <div class="checkout-product-actions">
                                <span>Quantity: <span class="js-item-quantity">${product_quantity}</span></span>
                                <button type="button" class="js-update-quantity">Update</button>
                                <button type="button" class="js-remove-item">Remove</button>
                            </div>
                        </div>

                        <fieldset class="checkout-delivery-options">
                            <legend>Choose a delivery option</legend>

                            <label class="checkout-delivery-option">
                                <input type="radio" name="${product_id}" value="standard" checked>
                                <span>Tuesday, November 24</span>
                                <span>Free shipping</span>
                            </label>

                            <label class="checkout-delivery-option">
                                <input type="radio" name="${product_id}" value="priority">
                                <span>Wednesday, November 18</span>
                                <span>€4.99 shipping</span>
                            </label>

                            <label class="checkout-delivery-option">
                                <input type="radio" name="${product_id}" value="express">
                                <span>Monday, November 16</span>
                                <span>€9.99 shipping</span>
                            </label>
                        </fieldset>
                    </div>
                </article>
    `;
});
