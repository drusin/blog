const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  return {
    dir: {
      input: "content",
      output: "docs"
    },
    pathPrefix: "/blog/"
  }
};