export let bag_cart = JSON.parse(localStorage.getItem("bag_cart"));

if (!bag_cart) {
  bag_cart = [
    {
      product_id: "product-001",
      quantity: 2,
    },
    {
      product_id: "product-002",
      quantity: 1,
    },
    {
      product_id: "product-030",
      quantity: 1,
    },
  ];
}

function save_to_stotage() {
  localStorage.setItem("bag_cart", JSON.stringify(bag_cart));
}

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

  save_to_stotage();
}

export function remove_from_cart(product_id) {
  const new_bag_cart = [];
  bag_cart.forEach((item) => {
    if (item.product_id !== product_id) {
      new_bag_cart.push(item);
    }
  });
  bag_cart = new_bag_cart;
  save_to_stotage();
}
