---
title: "Tutorial: How to setup your 11ty project for GitHub Pages"
published: 2024-02-09
modified: 2024-04-05
tags: [11ty, github, ci, tutorial]
edits:
  - "2024-02-11: Using GitHub Actions documented"
  - "2024-04-05: Clarifications, finishing touches"
---
[11ty](https://www.11ty.dev/) is an awesome (and super fast) static site generator and [GitHub Pages](https://pages.github.com/) is a nice and free way to host a static website. The [11ty Deployment Documentation](https://www.11ty.dev/docs/deployment/) even mentions GitHub Pages, but doesn't document the small config changes you have to do to make your 11ty page work there. This post goes over two 11ty setups for GitHub Pages: one simple but a bit clunky, and one slightly more involved but also more comfortable in the end.

## GitHub Pages?
You can enable the Pages functionality for public repos in the repository settings. You can choose which branch should be deployed and if your static page is directly on the root or in the `docs` folder. The overall process is quite straightforward and well documented [here](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site). If you need some more complicated build steps, you can also deploy your page via custom actions (spoiler: this will be used in the second method).

## What is the problem?
In short: 11ty creates static links to internal pages and the browser expects them to be top-level, which they are not on GitHub Pages. So we need to make 11ty generate links with the right prefix.

Some more descritpive explanation:  
In theory, you can push the content of your 11ty `_site` folder to a pages-enabled respository (or configure 11ty to use the `docs` folder) and it after a small build process it will be serverd on `https://[your GitHub username].github.io/[repository name]/`. And if you try it out, the main page might work, but all the internal links will be broken and result in a `404` on GitHub Pages' side.

At the time of writing, googling for `11ty github pages` wasn't very helpful, I had to search through the [11ty discord](https://www.11ty.dev/blog/discord/) to understand what the actual problem was. Afterwards it still took me some trying out and some reading through the documentation to fix the problem for this blog.

## Fixing the problem
Below you will find a few step-by-step instructions together with explanaitions on how to deal with this isssue, depending on how you want your project to be set up:

### Prerequisites:
You have an 11ty project (e.g. the [11ty base blog template](https://github.com/11ty/eleventy-base-blog)) hosted in a public repository on GitHub and cloned it locally to your PC. The project works locally when running `npx @11ty/eleventy --serve`. You can push code changes to the GitHub repository.

### 11ty configuration: Main part of the fix, needed for both approaches
We need to tell 11ty that the webpage will be served from a subfolder.
1. If not present yet, create an 11ty settings file named `.eleventy.js` (the `.` at the beginning is important) in the root of your project. 11ty comes with a lot of sensible defaults which make it possible to start creating a static website with almost zero configuration. This fil is one way to add some plugins to 11ty and to change the configuration. Put the following content into it:

    ```js
    const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

    module.exports = function (eleventyConfig) {
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

### Hosting your 11ty webpage on GitHub
And now let's put it online!

#### Easiest: using the `docs` folder on your main branch
One of the easiest ways to host a static website is to put it in a folder named `docs` and let GitHub find it.

1. Setup GitHub Pages for the repository:
    1. Open the GitHub webpage page of your repository
    2. (Repository) Settings -> Code and automation / Pages
    3. Source: `Deploy from a branch`
    4. Branch: `main` (or whichever you want to your webpage to be hosted from)
    5. Folder: `docs`
2. Change the default 11ty config in your local clone of the project:
    1. Open the `.eleventy.js` file on your pc (if you don't have one, you probably missed [the main part of the fix](#11ty-configuration-main-part-of-the-fix-needed-for-both-approaches))
    2. Add `dir: { output: "docs" }` like below to change the output folder from the default `_site` to the GitHub Pages preferred `docs`:

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
    3. If you run `npx @11ty/eleventy`, the generated html should now end up in the `docs` folder instead of the `_site` folder
3. In the `docs` folder, add an empty file named `.nojekyll` (again the `.` at the beginning is important) to tell GitHub that it shouldn't treat your webpage as a Jekyll project
4. (Optional) Delete the now obsolete `_pages` folder.
5. Commit your changes and push to GitHub.

A few minutes after pushing, you should see a new deployment for your project on the GitHub webpage.

#### A bit more involved, but also more comfortable once set up: use a GitHub Workflow to deploy Pages
The annoyance with the solution above is that you have to do the building of the built page yourself. With 11ty it takes milliseconds, so it's not too bad, but you still have to remember to do it and commit more files to git than necessary. It is also not a good practice to have built files that you don't need to version (because they are recreated every time you change something anyway) in version control. A nicer approach would be to let GitHub build the project automatically for you every time changes to the main branch are pushed.

1. Create a new remote branch named `gh-actions` in your repository:
    1. Open the GitHub webpage page of your repository
    2. Click on `1 branch` on the GitHub web interface
    3. Click on `New branch`
    4. Name it `gh-actions` and click `Create new branch` (the `Source` doesn't matter)
2. (Optional:) remove `dir: { output: "docs" },` from `.eleventy.config` if present - just a matter of taste, shorter config file vs. explicit configuration (because now the output folder will implicitly be the 11ty default `_site`)
3. Create a folder named `.github` (mind the `.`) in the root of the project, and a folder named `workflows` within. This is where GitHub is looking for workflow definitions
4. In the `workflows` folder:
    1. Create a file named `deploy-pages.yml`. This file will tell GitHub to build your site and host it on GitHub Pages after you push something to master. Use the following content:  

    ```yml
    # Name of the action:
    name: Deploy GH Pages

    # when should it trigger? 
    on:
      # trigger when something is pushed to the branch main
      push: 
        branches: [ "main" ]
      # make it possible to trigger manually, useful for debugging
      workflow_dispatch: 

    # what should be done
    jobs:
      # we have only one stage and we name it 'build'
      build:
        # this is the (docker) image used to run the steps below
        runs-on: ubuntu-latest

        steps:
          # checkout the branch
          - uses: actions/checkout@v3

          # install the project and to build the page
          - name: npm ci & build
            uses: actions/setup-node@v4
          - run: npm ci
          - run: npm npx @11ty/eleventy

          # deploy the content of _site to the branch gh-pages (default setting)
          - name: deploy
            uses: peaceiris/actions-gh-pages@v3
            with:
              # this line is needed for the action to be able to push something to your repository
              github_token: ${{ secrets.GITHUB_TOKEN }}
              publish_dir: ./_site
    ```
    2. If you you have a custom folder, change the value of `publish_dir` above accordingly
5. Push the changes to GitHub
6. Setup GitHub Pages for the repository:
    1. Open the GitHub webpage page of your repository
    2. (Repository) Settings -> Code and automation / Pages
    3. Source: `Deploy from a branch`
    4. Branch: `gh-pages`
    5. Folder: `root`

Now, after each push to the `main` branch, at first the `Deploy GH Pages` workflow will build your page and push it to `gh-pages` and afterwards the GitHub built-in workflow `pages-build-deployment` will publish the content on GitHub Pages.

## Closing remarks
Now you should have your 11ty page hosted and working on GitHub Pages!  
If you like my writing style and are interested on tutorials for things that were required in the above article, like using git or creating a basic page with 11ty, please tell me and I'll have a look at writing something up!
