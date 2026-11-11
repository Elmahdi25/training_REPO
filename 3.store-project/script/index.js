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
                    <h2 class="product-name">Black Everyday Jersey Hijab</h2>

                    <div class="product-rating">
                        <img class="product-stars" src="images/ratings/rating-${product.rating.stars * 10}.png" alt="${product.rating.stars} out of 5 stars">
                        <span class="product-review-count">${product.rating.count} reviews</span>
                    </div>

                    <p class="product-price">€${product.priceCents/100}</p>

                    <div class="product-actions">
                        <label class="product-quantity">
                            <span>Qty</span>
                            <select name="quantity" aria-label="Quantity">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="5">6</option>
                                <option value="5">7</option>
                                <option value="5">8</option>
                                <option value="5">9</option>
                                <option value="5">10</option>
                            </select>
                        </label>

                        <button class="add-to-bag js-add-to-cart" type="button" data-product-id="product-001">
                            Add to Bag
                        </button>
                    </div>
                </div>
            </article>
    `;
});

console.log(products);

