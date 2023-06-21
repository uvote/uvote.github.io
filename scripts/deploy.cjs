const ghpages = require("gh-pages");

ghpages.publish("build", (error) => {
  if (error) console.error(error);
});
