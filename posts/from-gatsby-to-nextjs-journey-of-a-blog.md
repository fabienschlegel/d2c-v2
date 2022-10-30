---
title: 'From Gatsby to NextJS - journey of a blog'
date: '2022-09-20'
coverImage: '/assets/blog/cover-images/from-gatsby-to-nextjs-journey-of-a-blog-illustration.png'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: 'Using Gatsby was a perfect example of not reinventing the wheel. Made with React, Giving free templates.'
tags: ['gatsby', 'story', 'blog', 'nextjs']
related: ['create-a-blog-with-nextjs', 'publish-my-own-blog-start-of-content-creator']
---

I have the idea to make a blog for two reasons. To help other developers and share my professional journey. To increase my value in the job market by learning new things and sharing my knowledge.

In the beginning, I impose two constraints on myself. Using React and keeping it simple. So I decide to use [Gatsby](https://www.gatsbyjs.com/) with markdown posts for the code and [Netlify](https://www.netlify.com/) to host the blog.

## Why GatsbyJS

I create the first version of my blog with GatsbyJS. I make the first commit the 31 July 2019. I use a template from the Gatsby starter library.

Using Gatsby was a perfect example of not reinventing the wheel. Made with React, Giving free templates.

Gatsby uses GraphQL under the hood. I have no time to learn it.

So I create a repository on Gitlab and make some changes to the template. After this, I make a yearly upgrade to update the Gatsby version. But nothing else.

At the beginning of 2020, I don’t have enough time and skills. I don't try to learn Gatsby further and evolve the blog's functionalities.

I keep it like that and write some posts only.

## Typescript is next

At the end of 2020, I begin learning Typescript to work on a React project. One of my coworkers helps at the beginning.

The project begins and after two months, I’m the only front-end developer in a team of three.

After seven months, the front-end part ends and I begin to work on another React project.

## React and SEO

In this new project, Some of the pages are public. The client encountered issues with SEO. One of my coworkers explains to me different solutions, and one of them is [NextJS](https://nextjs.org/).

With his team, he migrates the project he works on from React to NextJS only for SEO.

I make some research and keep it in mind. My client doesn’t have the budget and enough time to rewrite the project.

## NextJS is coming

At the beginning of 2022, I buy a house, change employers and after 2 years, become a real full remote worker.

Now, I’m more comfortable with React and Typescript. And I want to create more side projects.

Rewriting the blog is one of these ideas. I keep the two initial constraints and add another.

To have more features, posts must be under the blog path. For now, each post slugs are under the root path. The entire site can work with pre-rendering or server-side rendering. The hosting relies on Netlify. I want to use a design system.

I check my constraints and I choose NextJS to create my new site.

As a design system, I choose ChakraUI, I find it simpler than MaterialUI.

## Conclusion

I end the migration. I have only pre-rendered pages, created during the build. The next step will be using SSR to create a resources part. The next post I’ll write is about the technical aspect.

To follow my journey, I decide to open source the repository. It’s available on [Gitlab](https://gitlab.com/fabienschlegel/d2c-v2) and [Github](https://github.com/fabienschlegel/d2c-v2).

You can follow [the account of the site](https://twitter.com/devoreur2code) and [mine](https://twitter.com/fabienschlegel) on Twitter. I’ll post amazing news about next features.

See you soon!
