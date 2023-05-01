const sass = require("sass");

const result = sass.compile("src/styles/main.scss", {
  compressed: true,
  loadPaths: ["./node_modules"],
});
console.log(result.css);
