/* eslint-disable */

// @ts-ignore
const ghpages = require("gh-pages");

// @ts-ignore
ghpages.publish("dist", (error) => {
  if (error) console.error(error);
});

// TODO This file will be removed, it is ok for now to use ts-ignore and eslint-disable.
