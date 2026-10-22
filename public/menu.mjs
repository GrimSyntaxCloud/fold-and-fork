export const menu = [
  {
    id: "soda",
    category: "Drinks",
    name: "Soda",
    cents: 330,
    note: "A little fizz. A familiar favourite.",
    art: "drink",
  },
  {
    id: "tea",
    category: "Drinks",
    name: "Sweet Tea",
    cents: 330,
    note: "Slow brewed, served over ice.",
    art: "drink",
  },
  {
    id: "coffee",
    category: "Drinks",
    name: "Iced Coffee",
    cents: 249,
    note: "Your afternoon, on the rocks.",
    art: "coffee",
  },
  {
    id: "water",
    category: "Drinks",
    name: "Bottled Water",
    cents: 215,
    note: "Keep things beautifully simple.",
    art: "drink",
  },
  {
    id: "tacos",
    category: "Mains",
    name: "Street Tacos",
    cents: 970,
    note: "Small folds. Big personality.",
    art: "taco",
  },
  {
    id: "wings",
    category: "Mains",
    name: "Boneless Wings",
    cents: 1280,
    note: "The unofficial table favourite.",
    art: "wings",
  },
  {
    id: "burger",
    category: "Mains",
    name: "Cheese Burger with Fries",
    cents: 1265,
    note: "The classic, with good company.",
    art: "burger",
  },
  {
    id: "wrap",
    category: "Mains",
    name: "Chicken Wrap with Salad",
    cents: 1265,
    note: "A fresh perspective on lunch.",
    art: "wrap",
  },
  {
    id: "icecream",
    category: "Sweet things",
    name: "Ice Cream",
    cents: 430,
    note: "A scoop of very good judgement.",
    art: "icecream",
  },
  {
    id: "cake",
    category: "Sweet things",
    name: "Chocolate Cake",
    cents: 540,
    note: "Always leave a little room.",
    art: "cake",
  },
  {
    id: "pie",
    category: "Sweet things",
    name: "Apple Pie",
    cents: 540,
    note: "A warm ending to a good story.",
    art: "pie",
  },
];
export const dollars = (cents) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    cents / 100,
  );
export function total(ids, tip) {
  if (
    typeof tip !== "string" ||
    !/^\d{1,4}(\.\d{1,2})?$/.test(tip) ||
    Number(tip) > 999
  )
    throw Error("Use a tip from $0 to $999, with up to two decimal places.");
  const unique = [...new Set(ids)];
  if (unique.some((id) => !menu.some((item) => item.id === id)))
    throw Error("Unknown menu item.");
  const items = menu.filter((item) => unique.includes(item.id));
  const subtotal = items.reduce((sum, item) => sum + item.cents, 0);
  return {
    items,
    subtotal,
    tip: Math.round(Number(tip) * 100),
    total: subtotal + Math.round(Number(tip) * 100),
  };
}
