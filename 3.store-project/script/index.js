const js_products_grid = document.querySelector(".js-products-grid");

js_products_grid.innerHTML = "";

products.forEach((product) => {
  js_products_grid.innerHTML += `
    <article class="product-card">
                <div class="product-image-wrap">
                    <img class="product-image" src="${product.image}"
                        alt="${product.name}">
                </div>

                <div class="product-details">
                    <h2 class="product-name">${product.name}</h2>

                    <div class="product-rating">
                        <img class="product-stars" src="images/ratings/rating-${product.rating.stars * 10}.png" alt="${product.rating.stars} out of 5 stars">
                        <span class="product-review-count">${product.rating.count} reviews</span>
                    </div>

                    <p class="product-price">€${(product.priceCents / 100).toFixed(2)}</p>

                    <div class="product-actions">
                        <label class="product-quantity">
                            <span>Qty</span>
                            <select name="quantity" aria-label="Quantity" class="js-quantity-selector-${product.id}">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </label>

                        <button class="add-to-bag js-add-to-cart" type="button" data-product-id="${product.id}"
                        >
                            Add to Bag
                        </button>
                    </div>
                </div>
            </article>
    `;
});

const js_add_to_cart = document.querySelectorAll(".js-add-to-cart");

const bag_count = document.querySelector(".bag-count");

js_add_to_cart.forEach((button) => {
  button.addEventListener("click", () => {
    const product_id = button.dataset.productId;
    const js_quantity_selector = document.querySelector(
      `.js-quantity-selector-${product_id}`,
    );
    let matching_item;
    bag_cart.forEach((item) => {
      if (product_id === item.product_id) {
        matching_item = item;
      }
    });
    if (matching_item) {
      matching_item.quantity += Number(js_quantity_selector.value);
    } else {
      bag_cart.push({
        product_id: product_id,
        quantity: Number(js_quantity_selector.value),
      });
    }

    let cart_quantity = 0;
    bag_cart.forEach((item) => {
      cart_quantity += item.quantity;
    });

    bag_count.textContent = cart_quantity;

    console.log(bag_cart);
  });
});
