import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import { sortPosts, quote, paragraph } from "./custom-liquid.js";

export default function (eleventyConfig) {
  // needed for pathprefix to work in npm run code-server
  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
  
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy("src");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy({ "node_modules/@picocss/pico/css/pico.min.css": "pico.min.css" });
  eleventyConfig.addPassthroughCopy({ "node_modules/prismjs/themes/prism-okaidia.min.css": "prism-okaidia.min.css" });

  eleventyConfig.addFilter("sortPosts", sortPosts);
  eleventyConfig.addPairedShortcode("quote", quote);
  eleventyConfig.addShortcode("p", paragraph);

  return {
    dir: {
      input: "content"
    }
  }
};