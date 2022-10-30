---
title: 'Publish my own blog, the start of a content creator'
date: '2021-07-14'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: 'As a developer, I learn a lot of things. Some of it comes from my colleagues, books or articles I read. The idea of sharing what I know drove me to begin a blog about my journey.'
tags: ['gatsby', 'story', 'blog']
related: ['create-a-blog-with-nextjs', 'from-gatsby-to-nextjs-journey-of-a-blog']
---

As a developer, I learn a lot of things. Some of it comes from my colleagues, books or articles I read.

The idea of sharing what I know drove me to begin a blog about my journey.

So I made a list of what I wanted and what not.

- Don't start from scratch.
- Use a simple solution, no database.
- Must be responsive.
- Write posts with Markdown.
- Own my content.
- Be able to display code on posts.

## The technical solution

After some research, I decide to use GatsbyJS.

Gatsby use React and make some improvements, add or remove features will be easier.

The build is static and it comes with basic starters for blogs. Plugins for Google analytics and SEO already exists.

I don't know if Gatsby is the best, but like for each tool, I recommend using the one you are most comfortable with.

After installing it and make some tests, I choose a starter and I edit it. I remove some parts, create an about page, add Google Analytics, and edit CSS to use my own colours.

[This outdated post](https://www.freecodecamp.org/news/how-to-build-a-react-and-gatsby-powered-blog-in-about-10-minutes-625c35c06481/) from FreeCodeCamp helps me a lot to understand some basics of Gatsby.

If you are a beginner, you can use the starter with updated site metadata in Gatsby config only. After learning some React, you'll able to make more improvements.

I create a repository on Gitlab and push the project on it. The configuration is basic, develop is the default branch and used for preview, the master branch is the production one. The repository is public if you want to see the details.

The first time I release the site was in 2019. I wrote some posts and by lack of time, I abandoned the blog until May 2021.

After one year and a half, I come back, update all the packages and fix bugs. I decided to translate it from French to English.

This first version comes with a lot of defaults. It's one of my projects, write my own version of my blog with Gatsby and Typescript, to add more features and design it more as a personal branding site.

## The hosting

My first rule for a side project is: if it doesn't bring in any money, it costs as little as possible.

After another research, I found Netlify. The starter plan is enough for me. I have 100GB bandwidth and 300 build minutes by month.

To set up your site, it's really easy, you choose New site from Git in the team overview panel, give Netlify access to your Gitlab or Github and you chose the right repository.

The last step is the settings part.

For a Gatsby site, I use this :

- Branch to deploy: master
- Build command: gatsby build
- Publish repository: public/

That's all for a basic configuration. You can use a subdomain of the _netlify.app_ domain or configure your own.

I chose to configure my own domain. In settings of the site, I go to the domain management, add my domain to the primary domain field and configure HTTPS with Let's Encrypt.

The HTTPS part can take time and must be done after you configure the domain.

With Netlify you can register your domain, I think the setup will be easier. But I have my domain registrar, it's OVH.

So I had to update my DNS records with an A record to the Netlify load balancer and a TXT record for Google Analytics as explained in the documentation.

Maybe I can make some improvements and comments are welcome.

Deployments are automatic because Netlify has access to your repository.

## The republishing

The harder part when you start a website is visibility. Social media can help you. I make a tweet every time I publish a post on my blog.

But I discovered recently another solution: content publishing platforms.

These platforms are free and you can publish your content. No problem with duplicate content, you can set a canonical URL. This is a meta tag in the HTML page to advise the web crawler.

I use _DEV Community_ and _Hashnode_ to republish my content.

It's very simple, you create an account, you create a post. Both of them have a markdown editor which includes a snippet code viewer. The only thing you must do is copy and paste your post from your repository.

## Conclusion

It's simple to host your own blog with some work and use platforms to republish content.

Make a basic version to begin to publish and after a time, invest time to improve things.

## Resources

- My gitlab repository : [https://gitlab.com/Humch/d2c](https://gitlab.com/Humch/d2c)
- Gatsby site : [https://www.gatsbyjs.com/](https://www.gatsbyjs.com/)
- Gatsby starters : [https://www.gatsbyjs.com/starters/](https://www.gatsbyjs.com/starters/)
- Netlify : [https://www.netlify.com/](https://www.netlify.com/)
- Configure custom domain : [https://docs.netlify.com/domains-https/custom-domains/](https://docs.netlify.com/domains-https/custom-domains/)
- DEV Community : [https://dev.to/](https://dev.to/)
- Hashnode : [https://hashnode.com/](https://hashnode.com/)
