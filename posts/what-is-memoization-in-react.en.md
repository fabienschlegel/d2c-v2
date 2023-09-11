---
title: 'What is memoization in React'
pageTitle: 'What Is Memoization in React and How to Use It'
date: '2023-03-08'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/what-is-memoization-in-react-illustration.webp'
excerpt: 'Learn how to optimize your ReactJS application by implementing memoization using TypeScript. This article covers the basics of memoization, how it works, and how you can use it.'
tags: ['react', 'typescript', 'hooks']
related: ['five-tips-about-react-hooks', 'how-to-test-react-hooks']
---

Memoization is a powerful optimization technique used to improve the performance of your application by caching the results of expensive function calls.

It can provide significant performance improvements. In this article, we'll explore the basics of memoization, how it works, and how you can apply it to your TypeScript and ReactJS projects with code examples.

## What is Memoization?

Memoization is a technique used to optimize expensive function calls by caching the result of those function calls. When a function is called with a specific set of inputs, the output of that function is stored in a cache.

The next time the function is called with the same inputs, the cached output is returned instead of recomputing the output.

This can significantly reduce the amount of time it takes to execute the function and improve the performance of your application.

## How Does Memoization Work?

Memoization works by storing the results of function calls in a cache. The cache is typically implemented as an object, where the keys are the function inputs and the values are the corresponding function outputs.

When a function is called, the inputs are used to look up the cached output. If the output is found in the cache, it is returned. If the output is not found in the cache, the function is executed, and the output is stored in the cache for future use.

## Applying Memoization to TypeScript and ReactJS

Applying memoization to TypeScript and ReactJS is relatively straightforward. There are several libraries available that provide memoization functionality, such as memoize function from [Lodash](https://lodash.com/docs/4.17.15#memoize), [reselect](https://github.com/reduxjs/reselect) or hooks from ReactJS. These libraries can be installed using NPM or Yarn and used in your TypeScript and ReactJS projects.

### With the reselect library

Here's an example of how you can use memoization in a ReactJS component using the reselect library.

If you use the Redux Tool Kit package, reselect is include by default.

```tsx
import { createSelector } from 'reselect';

const getExpensiveData = (state) => state.expensiveData;

const getMemoizedData = createSelector([getExpensiveData], (expensiveData) => {
  // Expensive computation here
  return expensiveData.map((item) => item * 2);
});

function MyComponent(props) {
  const memoizedData = useSelector(getMemoizedData);

  return (
    <div>
      {memoizedData.map((item) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
}
```

In this example, we're using the reselect library to create a memoized selector that computes some expensive data.

The `getExpensiveData` function selects the expensive data from the Redux store, and the `getMemoizedData` function computes the expensive data using the `createSelector` function from reselect.

The `createSelector` function takes an array of input selectors and a result function that computes the memoized value. The `useSelector` hook is then used to select the memoized data from the Redux store and render it in the component.

### With the useMemo hook

Here's an example of how to use memoization in a React component using hooks.

```tsx
import React, { useState, useMemo } from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);

  const expensiveComputation = (num: number) => {
    console.log('Computing...');
    return num ** 2;
  };

  // memoize the expensiveComputation function
  const memoizedComputation = useMemo(() => expensiveComputation(count), [count]);

  return (
    <div>
      <h1>Memoization Example</h1>
      <p>Count: {count}</p>
      <p>Computed value: {memoizedComputation}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
};

export default MyComponent;
```

In this example, a simple React component uses the `useState` hook to maintain a count variable. We also have a function called `expensiveComputation` that takes a number as an argument and returns its square.

To memoize the `expensiveComputation` function, we use the `useMemo` hook. The `useMemo` hook takes two arguments: a function to memoize and an array of dependencies. In this case, we're memoizing the `expensiveComputation` function and only re-computing its result when the `count` variable changes.

By using `useMemo`, we can prevent unnecessary re-computations of `expensiveComputation`, improving the performance of our component.

Overall, memoization can be a powerful tool for improving the performance of your TypeScript and ReactJS applications, and using hooks like `useMemo` can make it easy to implement memoization in your components.

Another way to use memoization in React components is by using the `useCallback` hook. The `useCallback` hook can be used to memoize a function and prevent unnecessary re-renders of a component.

Here's an example:

```tsx
import React, { useState, useCallback } from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);

  // memoize the handleClick function
  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []);

  return (
    <div>
      <h1>Memoization Example</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default MyComponent;
```

In this example, we're using the `useCallback` hook to memoize the `handleClick` function. The `useCallback` hook takes two arguments: a function to memoize and an array of dependencies. In this case, we're memoizing the `handleClick` function and providing an empty array as the dependencies, which means that the function will only be memoized once.

By using `useCallback`, we can prevent unnecessary re-renders of our component, which can improve performance. Memoization can be a powerful tool in React applications, and using hooks like `useCallback` can make it easy to implement memoization in your components.

## Benefits of Memoization in TypeScript and ReactJS

There are several benefits to using memoization in your TypeScript and ReactJS projects:

- **Improved performance**: Memoization can significantly improve the performance of your application by reducing the number of expensive function calls.
- **Reduced re-renders**: Memoization can also reduce the number of re-renders in your ReactJS components by preventing unnecessary renders when the input data hasn't changed.
- **Cleaner code**: Memoization can also result in cleaner code and more modular code. By separating the computation logic from the rendering logic, you can create more modular and reusable code.
- **Scalability**: As your application grows and becomes more complex, memoization can help you maintain performance and scalability by preventing unnecessary recomputations.
- **Easier Debugging**: Memoization can make debugging easier by providing a cache of function results, making it easier to identify potential issues with your code.

Functions that are computationally expensive and have a high likelihood of being called repeatedly with the same inputs are good candidates for memoization.

Memoization can increase memory usage and introduce complexity to your code. It's important to use memoization judiciously and only in cases where it provides a significant performance benefit.

## Conclusion

Memoization is a powerful optimization technique that can significantly improve the performance of your TypeScript and ReactJS applications.

By caching the results of expensive function calls, you can reduce the number of computations and improve the scalability of your application.

With the help of libraries like reselect, memoization can be easily implemented in your TypeScript and ReactJS projects. However, it's essential to use memoization judiciously and only in cases where it provides a significant performance benefit.

With the benefits of improved performance, reduced re-renders, cleaner code, and scalability, memoization is definitely worth considering for your TypeScript and ReactJS projects.
