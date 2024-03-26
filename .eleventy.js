const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

module.exports = function(eleventyConfig) {
  // necessary to automatically prepend the prefix to internal links
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  eleventyConfig.addPassthroughCopy({ "node_modules/@picocss/pico/css/pico.min.css": "pico.min.css" });
  return {
    dir: {
      input: "content"
    },
    // prefix used by GitHub Pages, usually your project name
    pathPrefix: "/blog/"
  }
};