import { menu, dollars, total } from "./menu.mjs";
const $ = (s) => document.querySelector(s),
  selected = new Set();
let category = "Mains",
  motion = !matchMedia("(prefers-reduced-motion: reduce)").matches,
  toastTimer;
const shapes = {
  taco: '<path d="M25 102 Q20 15 95 22 Q165 20 170 100Z" fill="#eac574"/><path d="M40 73 Q50 22 75 49 Q95 16 115 49 Q145 30 155 75" fill="none" stroke="#6d914b" stroke-width="17"/><path d="M31 101 Q65 39 113 62 Q152 71 170 102" fill="#f5d891" stroke="#d8ae5b" stroke-width="3"/>',
  wings:
    '<g fill="#d48948" stroke="#ac6737" stroke-width="2"><ellipse cx="60" cy="73" rx="38" ry="24" transform="rotate(-25 60 73)"/><ellipse cx="122" cy="56" rx="38" ry="24" transform="rotate(20 122 56)"/><ellipse cx="123" cy="99" rx="38" ry="24"/></g>',
  burger:
    '<path d="M40 58 Q46 13 100 13 Q157 15 163 58Z" fill="#edbe74"/><rect x="35" y="62" width="134" height="17" rx="8" fill="#587c46"/><path d="M39 75 L162 75 L153 94 L100 103 L52 91Z" fill="#edbd49"/><rect x="35" y="89" width="132" height="21" rx="10" fill="#77503b"/><path d="M38 112 H165 Q158 138 100 137 Q42 137 38 112Z" fill="#edbe74"/>',
  wrap: '<path d="M45 29 L150 50 L133 129 L80 127Z" fill="#f4dba2"/><path d="M49 30 Q100 0 149 50 Q116 75 49 30" fill="#759452"/><path d="M85 58 L139 91 L133 129 L80 127Z" fill="#f6efe0"/><path d="M84 65 L133 105" stroke="#d7cbb3" stroke-width="2"/>',
  drink:
    '<path d="M64 23 H138 L125 132 H77Z" fill="#df9e58"/><path d="M70 27 H132 L123 68 H76Z" fill="#f2cd8a"/><path d="M102 88 L123 9 L150 4" fill="none" stroke="#fff7da" stroke-width="7"/><path d="M82 44 H100 V61 H82Z" fill="#fff9e5" opacity=".65"/>',
  coffee:
    '<path d="M57 36 H139 L127 131 H70Z" fill="#a97750"/><path d="M58 35 H140 V52 H58Z" fill="#e7d3b1"/><path d="M103 79 L125 5" stroke="#eee4ce" stroke-width="7"/><path d="M75 63 H96 V84 H75Z" fill="#e5c7a0"/>',
  icecream:
    '<path d="M64 68 H138 L102 143Z" fill="#d8a76b"/><circle cx="101" cy="50" r="44" fill="#e89d9c"/><path d="M74 85 L121 113 M86 108 L129 88" stroke="#b78550" stroke-width="3"/>',
  cake: '<path d="M38 66 L132 23 L164 87 L164 124 L38 124Z" fill="#754b3d"/><path d="M38 66 L132 23 L164 87 L38 87Z" fill="#b77f62"/><path d="M38 102 H164" stroke="#ead0ac" stroke-width="9"/><circle cx="110" cy="44" r="12" fill="#bb5b49"/>',
  pie: '<path d="M35 92 L142 32 L166 117 L45 127Z" fill="#cb8b4c"/><path d="M35 86 L142 26 L166 102 L45 112Z" fill="#e7c888"/><g stroke="#fff0c1" stroke-width="6"><path d="M72 69 L128 107 M98 53 L153 92 M49 100 L145 45 M87 109 L157 76"/></g>',
};
function art(type) {
  return `<svg viewBox="0 0 200 155" aria-hidden="true"><ellipse cx="100" cy="132" rx="83" ry="17" fill="#fff7e8"/>${shapes[type] || shapes.drink}</svg>`;
}
function announce(message) {
  $("#toast").textContent = message;
  $("#toast").classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("visible"), 4000);
}
function renderCards() {
  const focus = document.activeElement?.dataset.id;
  $("#cards").replaceChildren();
  for (const item of menu.filter((m) => m.category === category)) {
    const card = document.createElement("article");
    card.className = "food-card" + (selected.has(item.id) ? " selected" : "");
    const visual = document.createElement("div");
    visual.className = "food-art";
    visual.innerHTML = art(item.art);
    const info = document.createElement("div");
    info.className = "food-info";
    const title = document.createElement("h3");
    title.textContent = item.name;
    const note = document.createElement("p");
    note.textContent = item.note;
    const bottom = document.createElement("div");
    bottom.className = "food-bottom";
    const price = document.createElement("strong");
    price.textContent = dollars(item.cents);
    const button = document.createElement("button");
    button.dataset.id = item.id;
    button.setAttribute("aria-label", `Select ${item.name}`);
    button.setAttribute("aria-pressed", selected.has(item.id));
    button.textContent = selected.has(item.id) ? "✓" : "+";
    button.onclick = () => {
      selected.has(item.id) ? selected.delete(item.id) : selected.add(item.id);
      renderCards();
      renderOrder();
    };
    bottom.append(price, button);
    info.append(title, note, bottom);
    card.append(visual, info);
    $("#cards").append(card);
  }
  if (focus)
    document
      .querySelector(`[data-id="${focus}"]`)
      ?.focus({ preventScroll: true });
}
function rows(target, items) {
  target.replaceChildren();
  for (const item of items) {
    const li = document.createElement("li"),
      label = document.createElement("span"),
      price = document.createElement("span");
    label.textContent = item.name;
    price.textContent = dollars(item.cents);
    li.append(label, price);
    target.append(li);
  }
}
function renderOrder() {
  rows(
    $("#order-items"),
    menu.filter((m) => selected.has(m.id)),
  );
  $("#empty").hidden = selected.size > 0;
  try {
    const bill = total([...selected], $("#tip").value);
    $("#tip-error").textContent = "";
    $("#tip").removeAttribute("aria-invalid");
    $("#total").textContent = dollars(bill.total);
    $("#review").disabled = !selected.size;
    if (motion)
      $("#total").animate(
        [
          { transform: "rotateX(-35deg)", opacity: 0.5 },
          { transform: "rotateX(0)", opacity: 1 },
        ],
        { duration: 230 },
      );
  } catch (e) {
    $("#tip-error").textContent = e.message;
    $("#tip").setAttribute("aria-invalid", "true");
    $("#total").textContent = "—";
    $("#review").disabled = true;
  }
}
function clear() {
  selected.clear();
  $("#tip").value = "0";
  renderCards();
  renderOrder();
}
document.querySelectorAll("[data-filter]").forEach(
  (b) =>
    (b.onclick = () => {
      category = b.dataset.filter;
      document
        .querySelectorAll("[data-filter]")
        .forEach((v) => v.setAttribute("aria-pressed", v === b));
      renderCards();
    }),
);
$("#tip").addEventListener("input", renderOrder);
$("#clear").onclick = clear;
$("#review").onclick = () => {
  const bill = total([...selected], $("#tip").value);
  rows($("#confirm-items"), [...bill.items, { name: "Tip", cents: bill.tip }]);
  $("#confirm-total").textContent = dollars(bill.total);
  $("#confirmation").showModal();
};
function close(message) {
  $("#confirmation").close();
  clear();
  announce(message);
  $("#clear").focus();
}
$("#confirm").onclick = () =>
  close("Your demo order is confirmed. Good choice!");
$("#cancel").onclick = () =>
  close("Demo order cancelled. A fresh table awaits.");
$("#confirmation").addEventListener("cancel", (e) => {
  e.preventDefault();
  close("Demo order cancelled.");
});
$("#motion").onclick = () => {
  motion = !motion;
  document.body.classList.toggle("paused", !motion);
  $("#motion").setAttribute("aria-pressed", !motion);
  $("#motion").textContent = motion ? "Pause motion" : "Resume motion";
};
if (!motion) {
  document.body.classList.add("paused");
  $("#motion").textContent = "Resume motion";
  $("#motion").setAttribute("aria-pressed", "true");
}
renderCards();
renderOrder();
