---
title: How to setup your 11ty project for GitHub Pages
published: 2024-02-09
modified: 2024-02-11
---
[11ty](https://www.11ty.dev/) is an awesome (and super fast) static site generator and [GitHub Pages](https://pages.github.com/) is a nice and free way to host a static website. The [11ty Deployment Documentation](https://www.11ty.dev/docs/deployment/) even mentions GitHub Pages, but doesn't mention the small config changes you have to do to make your 11ty page work there. This post goes over three possible 11ty setups and how to make them work with GitHub Pages.

## GitHub Pages?
You can enable the Pages functionality for public repos in the repository settings. You can choose which branch should be deployed and if your static page is directly on the root or in the `docs` folder. The overall process is very straightforward and well documented [here](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site). If you need some more complicated build steps, you can also deploy your page via custom actions.

## What is the problem?
11ty creates static links to internal pages and the browser expects them to be top-level, which they are not on GitHub Pages. So we need to make 11ty generate links with the right prefix.

Some more descritpive explanation:  
In theory, you can push the content of your 11ty `_site` folder to a pages-enabled respository (or configure 11ty to use the `docs` folder) and it after a small build process it will be serverd on `https://[your GitHub username].github.io/[repository name]/`. And if you try it out, the main page will work, but all the internal links will be broken and result in a `404` on GitHub Pages' side.

At the time of writing, googling for `11ty github pages` wasn't very helpful, I had to search through the [11ty discord](https://www.11ty.dev/blog/discord/) to understand what the actual problem was. Afterwards it still took me some trying out and some reading through the documentation to fix the problem for this blog.

## Fixing the problem
Below you will find a few step-by-step instructions on how to deal with this isssue, depending on how you want your project to be set up:

### Prerequisites:
You have an 11ty project (e.g. the [11ty base blog template](https://github.com/11ty/eleventy-base-blog)) hosted in a public repository on GitHub and cloned it locally to your PC. The project works locally when running `npx @11ty/eleventy --serve`.

### Main part of the fix, needed for all approaches
We need to tell 11ty that the webpage will be served from a subfolder.
1. If not present yet, create an 11ty settings file named `.eleventy.js` (the `.` at the beginning is important) in the root of your project with the following content:  
    ```js
    const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

    module.exports = function(eleventyConfig) {
      // necessary to automatically prepend the prefix to internal links
      eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
      return {
        // prefix used by GitHub Pages, usually your project name
        pathPrefix: "/blog/"
      }
    };
    ```
2. Make sure that the value of `pathPrefix` above matches the name of your GitHub repository
3. Verify that everything works locally:
    1. Run `npx @11ty/eleventy --serve` in your project's root folder
    2. Observe that the webpage is now served on `localhost:8080/blog` (replace `blog` with the `pathPrefix` you set)
    3. Veryfy that all local links are still working (might need to reload the page without cache, `SHIFT + F5` in Chrome, `CTRL + F5` in Firefox)

### Easiest: using the `docs` folder on your main branch
One of the easiest ways to host a static website is to put it in a folder named `docs` and let GitHub find it.

1. Setup GitHub Pages for the repository:
    1. (Repository) Settings -> Code and automation / Pages
    2. Source: `Deploy from a branch`
    3. Branch: `main` (or whichever you want to your webpage to be hosted from)
    4. Folder: `docs`
2. Change the 11ty config in your local clone of the project:
    1. Add `dir: { output: "docs" }` to the exported function's return value. This is how it could look afterwards:
    ```js
    const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

    module.exports = function(eleventyConfig) {
      // necessary to automatically prepend the prefix to internal links
      eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
      return {
        dir: {
        // use GitHub's preferred output folder
          output: "docs"
        },
        // prefix used by GitHub Pages, usually your project name
        pathPrefix: "/blog/"
      }
    };
    ```
    2. If you run `npx @11ty/eleventy` the generated html should now end up in the `docs` folder instead of the `_site` folder
4. In the `docs` folder, add an empty file named `.nojekyll` (again the `.` at the beginning is important) to tell GitHub that it shouldn't treat your webpage as a Jekyll project
5. (Optional) Delete the now obsolete `_pages` folder.
6. Commit your changes and push to GitHub.

A few minutes after pushing, you should see a new deployment for your project on the GitHub webpage.

### A bit more involved, but also more elegant: use a GitHub Workflow to deploy Pages
The problem with the solution above is that you have to do the building yourself pushing of the built page yourself. With 11ty it takes seconds, so it's not too bad, but a nicer approach would be to put the build folder on `.gitignore` and let GitHub build the project automatically everytime something to the main branch is pushed.

1. Create a new remote branch named `gh-actions` in your repository
    1. Click on `1 branch` on the GitHub web interface
    2. Click on `New branch`
    3. Name it `gh-actions` and click `Create new branch` (the `Source` doesn't matter)
2. (Optional:) remove `dir: { output: "docs" },` from `.eleventy.config` if present - just a matter of taste, shorter config file vs. explicit configuration (because now the output folder will implicitly be the 11ty default `_site`)
3. Create a folder named `.github` (mind the `.`) in the root of the project, and a folder named `workflows` within
4. In the `workflows` folder:
    1. Create a file named `deploy-pages.yml` with the following content:  
    ```yml
    name: Deploy GH Pages

    on:
      push: 
        # trigger when something is pushed to the branch main
        branches: [ "main" ]
      # make it possible to trigger manually
      workflow_dispatch: 

    jobs:
      build:
        runs-on: ubuntu-latest

        steps:
          # checkout the branch
          - uses: actions/checkout@v3

          # run npm ci and npm run build
          - name: npm ci & build
            uses: actions/setup-node@v4
          - run: npm ci
          - run: npm npx @11ty/eleventy

          # deploy the content of _site to the branch gh-pages (default setting)
          - name: deploy
            uses: peaceiris/actions-gh-pages@v3
            with:
              github_token: ${{ secrets.GITHUB_TOKEN }}
              publish_dir: ./_site
    ```
    2. If you you have a custom folder, change the value of `publish_dir` above accordingly
5. Push the changes to GitHub
6. Setup GitHub Pages for the repository:
    1. (Repository) Settings -> Code and automation / Pages
    2. Source: `Deploy from a branch`
    3. Branch: `gh-pages`
    4. Folder: `root`

Now, after each push to the `main` branch, at first the `Deploy GH Pages` workflow will build your page and push it to `gh-pages` and afterwards the GitHub built-in workflow `pages-build-deployment` will publish the content on GitHub Pages.
