const fs = require("node:fs");
fs.rmSync("release", { recursive: true, force: true });
fs.cpSync("public", "release", { recursive: true });
console.log("Static site built.");
