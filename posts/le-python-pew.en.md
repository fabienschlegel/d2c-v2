---
title: 'Introduction to Pew - A Python Library for Creating Virtual Environments'
pageTitle: 'Pew : Managing your vitual environments in Python'
date: '2019-10-14'
updated: '2023-04-14'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: 'Learn how to use Pew, a Python library, to create and manage virtual environments, allowing you to work with different versions of Python and project dependencies without affecting your system configuration.'
tags: ['python', 'library']
---

If you're a Python developer, you know the importance of using a virtual environment for your projects. Pew is a Python library that allows you to create and manage virtual environments with ease. In this article, we'll take a look at how to use Pew to create and manage virtual environments.

## What is Pew?

Pew is a Python library that provides a set of commands to create and manage virtual environments. It is similar to other virtual environment tools like virtualenv and conda. The difference is that Pew provides additional features and commands that make it easier to work with virtual environments.

## Installing Pew

To install Pew, use the following command:

```shell
sudo pip3 install pew
```

## Getting Started with Pew

Once you have Pew installed, you can create a new virtual environment by using the `mkproject` command. This command creates a new virtual environment and switches to it:

```shell
pew mkproject myproject
```

Now, you are in your new virtual environment. If you want to exit the virtual environment, you can use the `exit` command. To see a list of your virtual environments, use the `ls` command. To switch to a different virtual environment, use the `workon` command followed by the name of the virtual environment:

```shell
pew workon myproject
```

That's it! You now know how to use Pew to create and manage virtual environments.

## Conclusion

Virtual environments are an essential tool for Python developers. They allow you to work with different versions of Python and project dependencies without affecting your system configuration.

Pew makes it easy to create and manage virtual environments, and it provides additional features and commands that make it even more useful. Try it out for yourself and see how it can improve your Python development workflow.
