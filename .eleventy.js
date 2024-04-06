const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const customFilters = require("./custom-filters");

module.exports = function (eleventyConfig) {
  // used for prefixing links
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy("src");
  eleventyConfig.addPassthroughCopy({ "node_modules/@picocss/pico/css/pico.min.css": "pico.min.css" });
  eleventyConfig.addPassthroughCopy({ "node_modules/prismjs/themes/prism-okaidia.min.css": "prism-okaidia.min.css" });

  eleventyConfig.addFilter("sortPosts", customFilters.sortPosts);

  return {
    dir: {
      input: "content"
    },
    pathPrefix: "/blog/"
  }
};