# Fold & Fork

[Live demo](https://grimsyntaxcloud.github.io/fold-and-fork/)

A restaurant-ordering interaction study with an origami menu, clay-like food illustrations, responsive selection feedback and an unfolding receipt. Choose from eleven original menu items, add an optional tip, review a bill, and confirm or cancel the fictional order.

## Origin and authorship

The foundation is **Richard Krasso's MIT-licensed restaurant example**, preserved in the fork at [`web-426/week-9/restaurant-app`](https://github.com/GrimSyntaxCloud/web-426/tree/master/week-9/restaurant-app). It is not presented as an original restaurant application authored by Andres. Andres's contribution is this recovery, visual redesign, native-JavaScript rebuild, validation and portfolio presentation, developed with AI assistance. The original license is retained in `LICENSE`.

## Preserved behavior and fixes

The original three categories, eleven menu choices and prices are retained, along with tip entry, order review, confirmation/cancellation and reset. The implementation now rebuilds each bill from the selected item IDs, preventing repeated reviews from accumulating duplicate items. Currency uses integer cents; malformed, negative and excessively large tips are rejected. Confirmation and cancellation clear the selection, matching the original flow.

This is a **browser-only demo**, just like the original ordering calculation. There is no backend order submission, payment, delivery, account, or saved customer data. Nothing is stored in a database, so the 96-hour database cleanup policy is not applicable. The restaurant name and branding are fictional.

## Run locally

```sh
npm ci
npm test
npm run build
npm start
```

Use Node.js 22.22 or newer and Python 3. `npm start` serves `public/` at `http://127.0.0.1:4393`. `npm run build` copies the static app to `release/`. GitHub Actions runs tests and publishes that folder to GitHub Pages for free.

The app uses no third-party runtime packages, remote fonts, paid imagery, analytics or API keys. Original CSS/SVG illustrations and native Web Animations create the effects. Reduced-motion support, a motion-pause control, semantic inputs, keyboard focus styles and a native modal dialog support accessible interaction.

Tests cover all original menu entries, currency arithmetic, duplicate-review prevention and invalid tips. Browser checks cover adding an item, reviewing a tip, confirming/resetting and responsive layouts.
