---
title: 'Create a blog with NextJS'
date: '2022-09-27'
coverImage: '/assets/blog/cover-images/create-a-blog-with-nextjs.png'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: 'How to create a blog with NextJS and Typescript. A guide from my own experience.'
tags: ['react', 'typescript', 'blog', 'nextjs']
related: ['from-gatsby-to-nextjs-journey-of-a-blog', 'publish-my-own-blog-start-of-content-creator']
---

This year I decided to migrate my blog from Gatsby to NextJS. To be able to add features more easily.

I use [ChakraUI](https://chakra-ui.com/) as a design system, Google Analytics for metrics, [Netlify](https://www.netlify.com/) to host it and Typescript as language.

## Create the project

In the first version of the blog, I wrote posts in markdown. I must keep it. As a developer, it’s easier than maintaining a WordPress (or other) back-end.

## NextJS

Creating a [NextJS](https://nextjs.org/) project, it’s straightforward, one command is enough. You add your project name, go to the project folder and start the dev environment.

```bash
npx create-next-app@latest --typescript
```

The project contains classic files of a typescript project. And some important files for NextJS too.

- `next.config.js`: the file used for the configuration
- the `pages` folder: contains an index file for the root page
- the `_app.tsx` file: inside the `pages` folder, it contains the component used to initialize pages.
- the `public` folder: used for all static files, like favicon and images.

In NextJS, each folder or file inside the pages folder is a route. You can follow all the routes by unfolding the tree.

## Useful packages

When I code, I like to use valuable packages.

- **_Prettier_**: to format my code. In Visual Studio Code, I use it with autosave.
- **_Husky_**: Prettier formats all supported staged files before the commit.
- **_Eslint_**: it gives a bunch of rules for linting your Typescript and Javascript files.
- **_Stylelint_**: same as Eslint, but for CSS and SCSS files.
- **_Markdownlint_**: another linter, for the markdown files.
- **_Sass_**: to support SCSS files.

You may think that’s too much. Using linters and code formatting tools are time savers.

When your project grows in size, you will encounter bugs. Consuming mental load to check semicolons and code indentation is a waste of time. Forward these things to tools and keep your time to write new features and fix bugs.

All these packages need a configuration file.

These configurations come from my experience on different projects. They can be outdated if you read this post long after its release.

## Structure of my app

For my React projects, I use a structure inside the `src` folder. It’s to dispatch files according to their purpose. Naming can change depending on the project.

- a `generic` folder: for everything you can use in each project without changes.
- a `business` folder: for all the features of the project. Each folder inside it is a feature.
- a `core` folder: for the rest of it. Configuration files, specific or shared services.

This is my first NextJS project and not having an `src` folder is disorienting. But adapting is part of the developer's skill set. I define a new structure. As each first time, it can't be the best one, but I’ll improve it later.

- the `pages` and the `public` folder: it’s used by the framework, so I must keep them.
- the `components` folder: each folder inside it contains a component and all I need for it.
- the `hooks` folder: contains all the custom hooks used by the components.
- the `core` folder: all I need for the app, like API, utilities, the custom theme for Chakra, etc.
- the `posts` folder: contains all the markdown files

If you have a few components, like me at the beginning of the project, don’t over-engineer your project. You don’t need plenty of empty folders and files.

## Implement ChakraUI

To add ChakraUI to the project, I use this command, as it’s explained in the [documentation](https://chakra-ui.com/getting-started).

```bash
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

To use ChakraUI, you must add a component called `ChakraProvider`. This component has a `theme` property, to override the ChakraUI default theme. You must add it inside the pages folder, in the `_app.tsx` file.

I create a custom theme file to extend colours and add fonts.

```typescript
import { extendTheme } from '@chakra-ui/react';

const mainTheme = extendTheme({
  colors: {
    brand: {
      darkBlue: '#1f4f6f',
      blue: '#22577a',
      greenBlue: '#38a3a5',
      greener: '#57cc99',
      green: '#80ED99',
      lightGreen: '#c7f9cc',
    },
  },
  fonts: {
    heading: `'Raleway', sans-serif`,
    body: `'Libre Baskerville', sans-serif`,
  },
});

export default mainTheme;
```

It's my first bug. I use SCSS `import` to fetch the google fonts. NextJS V12 use SWC as a minifier tool. There is a [bug](https://github.com/vercel/next.js/issues/32645) with this version and `import` doesn't work in production.

To resolve this, I do a Google search and find the solution [here](https://medium.com/nextjs/how-to-add-font-in-next-js-7a7fba80d528).

I use the special file `_document.tsx`. The build updates the render of the `html` and `body` tags in this file.

I add here all the scripts recommended by the Google fonts website. And it works.

```tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          {/* Google fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&family=Raleway:wght@800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

## CSS in JS

ChakraUI uses CSS properties as props for components. In the beginning, I use SCSS first and props after.

It’s a mistake. I have chosen a design system to gain time. Even though I lost time during the learning curve I will retrieve it afterwards. So I must exploit it at 100%. I will delete most styling files and try to keep only the SCSS file for the posts.

CSS in JS is easy to use. Instead of using CSS classes, you add the property to the component. In CSS, I write properties in kebab-case (lowercase and separated with hyphens). A React property can’t contain a hyphen. Instead, they’re in camel-case. Chakra gives us some shortcuts too, like `justify` for `justifyContent`.

Sometimes we need media queries. It’s for responsive design like the flexbox direction property above. Chakra gives us two [solutions](https://chakra-ui.com/docs/styled-system/responsive-styles): an array syntax and an object syntax. Using the object syntax is clearer. Keys are the different breakpoints.

```tsx
<Flex
  width="100%"
  padding={{ base: "0.5em", lg: "6em" }}
  align="center"
  justify={"space-evenly"}
  backgroundColor="brand.darkBlue"
  minHeight="80vh"
  direction={{ base: "column-reverse", lg: "row" }}
>
```

## From markdown to the post

The first version of the blog used Gatsby and a starter (like a template). At build, the engine uses GraphQL requests for posts. I haven’t had the time to understand how Gatsby uses GraphQL. So I left it out.

NextJS uses functions to read the posts and render them as props. To help, NextJS gives us a [starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter). I use it to understand how to proceed with markdown files.

First, we must execute this command to install the packages we need.

```bash
yarn add prismjs remark remark-html remark-prism gray-matter @types/remark-prism
```

It’s time to talk about `getStaticProps` and `getStaticPath`. It’s 2 special functions of NextJS.

### getStaticProps

It’s used for static site generation. This function run during the build, to generate static pages. The unique parameter is `context`.

I use it to get the last part of the URL named `slug`. I give it to functions which return the current post and some data about the next and the previous post.

`getStaticProps` return an object used by the component to render the posts page.

```typescript
export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'coverImage',
    'ogImage',
    'tags',
  ]);
  const content = await markdownToHtml(post.content || '');

  const previous = getPreviousPost(params.slug);

  const next = getNextPost(params.slug);

  return {
    props: {
      post: {
        ...post,
        content,
      },
      previous,
      next,
    },
  };
}
```

### getStaticPaths

It’s used for static site generation when you use dynamic routes. It builds all the static paths available during the build.

I use it to retrieve all the posts `slug` and get all the paths of my posts during the build.

```typescript
export async function getStaticPaths() {
  const posts = getAllPostsByDate(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
```

### The posts API

This is the main part of the process. How do we get a JSON object with the post’s data from a markdown file?

The `getPostBySlug` function will take as a parameter a string and an array. It represents the name of the file without extension and a list of fields. It comes from the last part of the URL. The function reads the file from the posts folder. The `gray-matter` library divides the data between the content and the metadata. The function returns an object to `getStaticProps`. Fields and content are the keys of this object.

```typescript
export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}
```

The `markdownToHtml` function uses the `remark` library. It transforms the value of the content field into text with HTML tags.

The last library I use there is PrismJS. This library highlight code parts of the post for better understanding.

```typescript
export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html, { sanitize: false }).use(prism).process(markdown);
  return result.toString();
}
```

## Create a list of posts from tags

Each of my posts contains tags. You click on a tag and you’re redirected to a dedicated page with filtered posts.

This is a 2 steps feature. Remember the `getStaticPaths`, it will create all the paths from the list of tags. We use it to get the list of all tags and create all the needed paths during the build. All is in this function.

```typescript
export function getAllTags(): Array<string> {
  const allPosts = getAllPosts(['slug', 'tags']);

  const flattenTags = allPosts.map((post) => post?.tags).flat();

  const allTags = flattenTags.filter((item, pos) => flattenTags.indexOf(item) == pos);
  return allTags;
}
```

Let me explain. Each post contains an array of tags. I use a map function to retrieve them. The flat function concatenate my array of arrays. So in `flattenTags`, I have an array of tags with duplicates. In the next function, I use a filter to remove all duplicates.

```typescript
export function getPostsByTag(tag: string, fields: string[] = []) {
  return getAllPostsByDate(fields).filter((post) => post.tags.includes(tag));
}
```

The second part retrieves the list of posts sorted by date. It keeps the posts if the array of tags includes the requested tag.

This API needs some improvements, like lowercase tags.

## Add Metrics

I like to have metrics on sites. I can know which content is most popular, the best size of the post, etc.

I use Google Analytics on the first version of the site with a Gatsby plugin. With NextJS, I’m unable to keep the same tool. After some Google research, I find what I’m looking for.

```tsx
{
  isProduction && (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
      <script
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
```

This snippet of code inside the `_document.tsx` file loads the script with my tracking ID. The `isProduction` boolean enable it if `NODE_ENV` variable is set to production.

## Add Sitemaps

Each website must have sitemaps and robots.txt files.

It helps search engines to index your site. I add the next-sitemap package to perform this. It runs after the build to collect all routes and create dedicated files. I add the package command the `postbuild` command in the `package.json` file and a configuration file.

After the deployment, sitemaps and robots.txt files will be available.

```typescript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://devoreur2code.com',
  generateRobotsTxt: true,
};
```

## Deployment

The previous version is already in production. I want to deploy the new version without creating duplicate content.

It is easy with Netlify. I create a new app in the dashboard and link it to my repository in 2 clicks. Netlify detects my app as a NextJS project and set everything for me I remove the domain in the first version. I add it to my new site in domain settings.

I deploy the new version in less than 10 minutes.

## Conclusion

I learn a lot of things by doing this rewriting of my website. I did some things wrong with my lack of experience with NextJS. But working as a developer is so interesting. You can learn by practice and progress.

Adding new features will help me to find bugs and improvements. I decide to open source the repository. It’s available on [Gitlab](https://gitlab.com/fabienschlegel/d2c-v2) and [Github](https://github.com/fabienschlegel/d2c-v2).

You can follow [the account of the site](https://twitter.com/devoreur2code) and [mine](https://twitter.com/fabienschlegel) on Twitter. I’ll post amazing news about next features.

See you soon!
