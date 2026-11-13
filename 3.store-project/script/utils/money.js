export function format_currency(matching_items) {
  const price = matching_items.priceCents;
  const final_price = (price / 100).toFixed(2);
  return final_price;
}
