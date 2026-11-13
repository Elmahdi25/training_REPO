export const bag_cart = [];

export function add_to_bag_cart(product_id, js_quantity_selector) {
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
}