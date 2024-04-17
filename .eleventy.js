const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const customLiquid = require("./custom-liquid");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy("src");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy({ "node_modules/@picocss/pico/css/pico.min.css": "pico.min.css" });
  eleventyConfig.addPassthroughCopy({ "node_modules/prismjs/themes/prism-okaidia.min.css": "prism-okaidia.min.css" });

  eleventyConfig.addFilter("sortPosts", customLiquid.sortPosts);
  eleventyConfig.addPairedShortcode("quote", customLiquid.quote);
  eleventyConfig.addShortcode("p", customLiquid.paragraph);

  return {
    dir: {
      input: "content"
    }
  }
};