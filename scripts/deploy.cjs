const ghpages = require("gh-pages");

ghpages.publish("public", (error) => {
  if (error) console.error(error);
});
