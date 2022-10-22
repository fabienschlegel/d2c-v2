---
title: '5 Reasons to use Django, the Python web framework'
date: '2021-06-11'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: 'Django is a Python framework for web development. You can create powerful and reliable app with it.'
tags: ['django', 'python']
---

Django is a Python framework for web development. These are the five reasons why you should use it.

## Faster Development

Python is really easy to learn. It is usually first language of choice for developers.

Django follow Python philosophy as DRY (Don't Repeat Yourself) and Batteries Included (Almost of your needs are covered by the framework itself).

It can be confusing at first, but Django handles a lot of stuff under the hood. So you don't worry about the details and it gets the job done.

For example, migrate your data need in the majority of cases, only two commands.

```bash
python manage.py makemigrations
python manage.py migrate
```

When more it's needed, Django provide help to integrate new fields, like default value.

Django included it's own ORM (Object Relational Mapping) to deal with the database.

There is a lot of included features like internationalization, routing, security, etc.

## Documentation

The documentation of the framework is always up to date,  covers all the supported versions. It contains an how to tutorial really detailed. Everything you need is accessible and you can easily inspect Django source code.

All major additional libraries follows the same guide lines, like [Django Rest Framework](https://www.django-rest-framework.org/).

Because Django is popular and used worldwide, sites like Stack Overflow are flooded with Django content.

## Admin

With Django, create a project, add some models and remove comment for the admin path.

It's all you need to have an admin interface to manage the data.

And believe me, that's a huge advantage over other frameworks, it's will save you a lot of time.

## Scalability

Scalability can be important when it comes to developing web apps. Django includes a series of default components that can be unplugged and replaced for more specific solutions, to handle scalability without efforts.

What is more, Django lets you use plugins to extend your web app, and there are countless packages available to help you scale up your product.

## Community

The community is huge. There are active developers in the community who develop great plugins to make app development easier.

With the code being open-source, you can speed up development by modifying easily available resources. If you run into any difficulties with your project, you can count on the Django community to help you with your projects.

## When to not use it

Even I have a high opinion about Django, like each framework or language, it's not the right answer in all cases.

For example with a very basic app, Django is overkill. A front end framework with Firebase may be enough. And for a small API, you can use Flask instead of Django and Django Rest Framework.

## The resources that have really helped me

- [Django Documentation](https://docs.djangoproject.com/en/3.2/)
- [Django Rest Framework](https://www.django-rest-framework.org/)
- [Django Templates and Filters](https://www.djangotemplatetagsandfilters.com/)
- [Dev Docs](https://devdocs.io/django~3.2-guides/)
- [Class Based Views Guide](https://ccbv.co.uk/)
- [simple is better than complex, a blog with useful posts](https://simpleisbetterthancomplex.com/)

## Conclusion

The learning curve for Django is low, and if you don't know Python, it's a good way to learn it.

Now I use Django as a REST API with React as front end. You can create powerful and reliable app with this couple of frameworks.

I hope this post will make you want to try Django.

You want more content about Django or Python ? Feel free to ask me on [Twitter](https://twitter.com/fabienschlegel)
