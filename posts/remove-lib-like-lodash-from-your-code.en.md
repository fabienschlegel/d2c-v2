---
title: 'Remove utility libraries such as Lodash'
pageTitle: 'How to optimize your project by removing utility libs'
date: '2024-05-21'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/remove-lib-like-lodash-from-your-code-illustration.webp'
excerpt: 'Discover how to reduce dependency on external libraries like Lodash to improve the performance and maintenance of your TypeScript code.'
tags: ['typescript']
related: ['typescript-for-react-development', 'javascript-reduce-method']
---

When you start a project, you often want to move fast. And to combine productivity and ease of development, we add utility libraries.

But this quest for simplicity can sometimes lead to a heavy reliance on external utility libraries such as Lodash.

This widely-used JavaScript library offers a panoply of utility functions facilitating data manipulation, table management and much more.

### The temptation of Lodash (or others)

Lodash's popularity is easy to explain. Its wide range of features and proven methods address many of the common processing needs of web applications.

Despite its obvious advantages, over-reliance on Lodash or any other external library can present major drawbacks in terms of the performance, maintainability and security of our code. In this article, we'll explore why you should consider reducing your reliance on such libraries in your TypeScript projects. We'll also look at available alternatives and methods for making this transition smoothly.

## The disadvantages of dependency

When a TypeScript code base becomes too dependent on a library, there are several significant drawbacks, affecting both performance and maintainability.

### Impact on performance

One of the first disadvantages lies in its impact on application performance. Every time we integrate an external function, we increase the size of the generated JavaScript bundle.

The larger the JavaScript bundle, the longer it will take to load the application. This can result in a poor user experience, particularly on slow networks or devices with limited resources.

### Increased complexity of the code base

Excessive dependency can also lead to increased complexity of the code base. By adding external dependencies, we introduce new potential breaking points into our application. Maintenance and version management become more complex, as we need to regularly monitor and update the versions of these libraries used in our project.

What's more, dependence on an external library can make the code less readable and harder to understand for new developers joining the team.

### Security risks

This dependency may also present security risks for our application. Each dependency added to our project potentially introduces new vulnerabilities. If these dependencies are not regularly updated to include the latest security patches, our application could be exposed to potential attacks.

Even if we add many useful features, dependencies can have detrimental consequences for our TypeScript projects. So it's important to carefully evaluate our use of these libraries and look for alternatives where possible.

## Finding alternatives

There are a number of alternatives available, including native JavaScript/TypeScript features as well as lighter, more specialized libraries.

### Using native JavaScript/TypeScript functionality

JavaScript and TypeScript offer a rich set of built-in features for manipulating data, arrays, strings and much more. By re-evaluating our data manipulation needs, we may discover that many of the tasks we currently use lodash for can be easily accomplished using native functions.

For example, common operations such as searching, filtering and sorting arrays can be carried out using methods such as `filter`, `map`, `reduce`, and so on.

Let's take a concrete example from Lodash. The `flow` function takes as parameters a list of functions, either as an array or as individual arguments, and returns a function that takes a value as an argument and executes it through the original functions given.

This is a very useful function for dynamically performing successive processing on data.

Here's an almost equivalent implementation in TypeScript. The only limitation comes from our generic typing, which obliges us to keep the same data type in input and output of our methods. We can therefore replace it in most cases.

```typescript
function pipe<T>(...fns: Array<(arg: T) => T>) {
  return function (value: T) {
    return fns.reduce((acc, fn) => fn(acc), value);
  };
}
```

### Using TypeScript's built-in functionality

Likewise, TypeScript offers powerful built-in functionality for manipulating objects, arrays and strings. For example, generic types, arrow functions, enumeration types and interfaces can be used to simplify and improve the maintainability of our code.

By exploring and using these built-in features, we can reduce our dependence on external libraries like lodash while improving the readability and maintainability of our code.

### Using lighter, more specialized libraries

Finally, when specific features are not available in native JavaScript/TypeScript functionality, we can look for alternative, lighter and more specialized libraries. These libraries are often designed for specific use cases and generally offer better or comparable performance, while having a lighter footprint.

By exploring these alternatives, we can reduce our dependence on external libraries like Lodash while improving the performance, maintainability and security of our TypeScript code. In the next section, we'll look at how to implement these alternatives to gradually remove Lodash from our code base.

## Methods for removing dependencies

Now that we've identified the drawbacks of over-dependency and explored the alternatives available, let's look at practical methods for removing these libraries from our TypeScript codebase.

### Analysis of current use in the project

The first step is to carefully analyze its current use in our project. We need to identify all instances of the library in our code base and understand which features are being used and in what context.

This can be done by searching the entire project for imports (e.g. `import * as _ from 'lodash'` for Lodash) as well as for specific function calls.

### Identifying used functions and available alternatives

Once we have an overview of how the library is used in our project, we need to identify the specific features that are used and look for alternatives available in JavaScript/TypeScript or other more lightweight, specialized libraries.

For each feature used, we need to assess whether it can be replaced by a native function or an alternative library, taking into account the performance, maintainability and compatibility of our code.

### Using tree shaking for targeted methods

An effective approach to adding targeted methods without including an entire library in our project is to use tree shaking. Tree shaking is a bundle optimization technique that eliminates unused parts of the code when building our application.

With tree shaking, we can import only the methods we need into our code, rather than importing the entire library. For example, if we're only using Lodash's `map` method, we can import it as follows:

```typescript
import map from 'lodash/map';
```

This allows the bundler to detect that only the `map` method is in use and include it in the final bundle, while eliminating other unused parts of the library.

It is also possible to add only the function to the `package.json` file by installing only the required method with `npm install lodash/map`.

### Steps for gradually replacing uses

Once we've identified the features to be replaced and the alternatives available, we can start gradually replacing them with native or alternative implementations.

This can be done by following an incremental approach, one at a time, and checking that our application's behavior remains consistent at each stage. It is also essential to set up automated tests to ensure that modifications do not cause regressions in our application.

### Regular monitoring and documentation

Finally, once we've reduced our dependency, it's important to maintain regular monitoring of new native JavaScript/TypeScript features and alternative libraries. By keeping up to date with developments in the language and the ecosystem, we can continue to optimize and improve our code base.

What's more, documenting the changes made and the reasons behind them can help make the code easier for team members to understand, and ensure a smooth transition for future developers joining the project.

## Case study: Migration to native solutions

To illustrate the process of migrating to native solutions, let's take the example of a web application developed in TypeScript using dependencies such as Lodash.

Let's take a look at the concrete steps you need to take to succeed.

1. **Usage analysis**: We start by analyzing our application, looking for all instances of the libraries to be replaced in our code. We identify the specific functionalities used and assess whether they can be replaced by native methods or lighter alternatives.
2. **Identifying alternatives**: For each feature used, we look for alternatives in native JavaScript/TypeScript features or in other, more lightweight, specialized libraries. We can use external resources such as [You-Dont-Need-Lodash-Underscore](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore), StackOverflow or ChatGPT. If replacement is impossible, using tree-shaking will help us limit external dependencies.
3. **Progressive replacement**: We start gradually replacing detected methods with native or alternative implementations. We carry out rigorous tests at each stage to ensure that the application's behavior remains consistent.
4. **Documentation and training**: We document the changes made and the reasons for these changes to make it easier for team members to understand the code.

## Conclusion

This article has shown us how we can reduce our dependence on external packages in our applications. Lodash is just one example, and these solutions can be transposed to any library.

Don't forget, too, that some libraries are worth keeping. They are maintained by talented developers who ensure the quality of their code.

Sometimes, you have to choose wisely between dependency and saving time. Some methods are easy to replace, thanks to the context of our project. But others would require too much time and energy. In this case, it's wiser to opt for dependence on external libraries.
