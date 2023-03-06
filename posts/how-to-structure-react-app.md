---
title: 'How to structure your React app'
date: '2023-01-25'
coverImage: '/assets/blog/cover-images/how-to-structure-react-app-illustration.webp'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
excerpt: 'Without a proper strategy in place, working on a React project can become a daily chore and an overwhelming task.'

tags: ['javascript', 'typescript', 'react']
related: ['conditional-rendering-of-your-react-components', 'working-with-rest-apis-in-react']
---

React is an excellent library for building user interfaces. But, it’s not a framework, which comes with a great default when it comes to organizing and structuring the project. Being too free and unguided can quickly make your project unmanageable.

Without a proper strategy in place, working on a React project can become a daily chore and an overwhelming task, especially for developers with limited experience.

## There is no good answer

This is the fundamental concept that needs to be grasped when undertaking a React project: there is no single, definitive solution. Every React project is unique and requires its own strategy since there are many ways to approach the same problem. The best course of action is to consider the specific context of the project, and then decide on the most suitable solution. This could involve exploring various options and experimenting with different approaches, to identify the most effective one. The goal is to create a React project that meets its objectives and provides a satisfactory result.

The most effective way to keep your files organized is a matter of personal preference, taking into account the size of the project, the technology being used, and the specific habits of the team. It can be helpful to set up a system of filing conventions for any project, large or small. This can help to ensure that all members of the team are working with the same file organization structure.

Taking the time to review the project's technical stack can help to determine the best filing methods. For example, if the project includes a database, it may be beneficial to organize the files to follow the database scheme, while a project involving object-oriented programming may need a different approach.

It's important to consider the team's habits when determining the best method of organizing files. Some teams may prefer a system of folders and sub-folders while others may prefer a more free-form system.

Whatever filing system is chosen, it is necessary to document it and share it with the team to ensure that all members are on the same page and can access the files they need.

It's important to be vigilant and challenge yourself to think about the decisions you make and the ideas you come up with. Taking the time to reflect on them and consider potential consequences could help you make the right choices and have a positive impact.

It's also important to be open to new ideas and perspectives, as these can help you see things from a different angle and come up with innovative solutions. Being mindful of your choices and ideas is a key part of personal growth and success.

Test out my solution and see if it fits your requirements. If not, do not hesitate to tweak and alter it to better suit your needs. There is no one-size-fits-all solution, so make sure to customize it to your individual requirements.

## Split by use

Assuming src is the root folder, I divide my code into 3 distinct parts. These three parts all contribute to the structure and functionality of the application. We begin with the generic part to finish with the more specific.

### The generic part

The first folder is for generic code, a collection of code snippets that can be used in any React project without any changes. This folder can be used to store any code that is not specific to any one project, such as components, functions, and other utilities that can be reused in different projects. This folder is a great starting point for any React project, as it contains code that can be used again and again. It's also a great way to save time, as you don't have to rewrite the same code.

This folder will be lightweight and easy to maintain if you choose to use a design system like MaterialUI, ChakraUI or any other similar library. By using a design system, you can ensure that your user interfaces are consistent across many platforms, while also having a unified look and feel that will be recognizable. Additionally, you'll have access to a range of features and components that will make it easier to design and develop your user interface, saving you time and effort in the long run.

In exchange for being able to produce consistent designs for applications, making custom components by tweaking the design system elements will be harder. This is because custom components need a more thoughtful approach and more in-depth understanding of the design system. Furthermore, it will take extra time and effort to ensure that the custom components are compatible with the design system and all its elements.

### The core part

Everything here is at the core of the app: authentication, routing, services, global constants, configuration files, and assets. Authentication is vital in ensuring the security of the app and its users, while routing provides the framework for defining navigation paths and services offer the ability to access and manipulate data. Global constants provide a means for configuring the app once and for all users, and assets are used for styling and visual elements. These components are essential for the successful functioning of the application.

If there's something specific to the app that is not only used by a single feature, it can be stored here in the core section. This section helps to keep all the necessary elements together and easily accessible, making it easier to manage and maintain the app.

Additionally, this section serves as a centralized hub for all the different components that are essential for the app to function properly. This way, developers and designers can quickly access the necessary elements and make any changes that are needed to keep the app running smoothly.

### The features part

The last part is for features. This is an important part of the overall product, and I'm inclined to name it features, business or something along those lines. It's more of a suggestion than a rule, though, so the exact name is not crucial.

All that matters is that the features are included in the product, as they are essential for it to be successful. The features should be carefully considered, as they are what makes the product stand out from its competitors in the market.

Each folder here is a unique feature of the app, and I have made sure to keep the same boilerplate for each one regardless of the number of files contained within it.

This method ensures consistency throughout the app. It helps ensure that each feature works as it should. This is beneficial since it makes the development process faster and more efficient. It also makes it easier to identify any potential issues that may arise, allowing for a more seamless user experience.

It’s paramount to ensure consistent naming conventions when a new developer is brought on board for a project. Doing so will make it easier for the developer to quickly grasp the underlying concepts and understand the work that needs to be done.

Moreover, it will also streamline communication between team members, enabling them to discuss the project more effectively and efficiently. This not only saves time but also helps to create a more productive working environment.

## Conclusion

This architecture is constantly improving and adapting to the context of the project. Try this and give me your feedback [here](https://twitter.com/fabienschlegel).

See you later!
