const ghpages = require("gh-pages");

ghpages.publish("dist", (error) => {
  if (error) console.error(error);
});
