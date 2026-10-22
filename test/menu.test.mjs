import test from "node:test";
import assert from "node:assert/strict";
import { menu, total } from "../public/menu.mjs";
test("original menu prices and all eleven choices are retained", () => {
  assert.equal(menu.length, 11);
  assert.equal(total(["soda", "tacos", "cake"], "2.50").total, 2090);
});
test("repeated review and duplicate IDs never accumulate items", () => {
  const ids = ["tacos", "tacos", "pie"];
  assert.equal(total(ids, "0").subtotal, 1510);
  assert.deepEqual(total(ids, "0"), total(ids, "0"));
});
test("money is calculated in cents and malformed tips are rejected", () => {
  assert.equal(total(["coffee"], "0.01").total, 250);
  for (const tip of ["-1", "abc", "1.234", "Infinity", "", "1000", "1e2"])
    assert.throws(() => total(["tacos"], tip));
  assert.throws(() => total(["unknown"], "0"));
});
