---
title: 'Manage your state with the useState hook in React'
date: '2022-11-11'
coverImage: '/assets/blog/cover-images/manage-your-state-with-the-usestate-in-react-illustration.png'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: 'How to useState in functional components. The first hook you can use in a React project.'

tags: ['javascript', 'typescript', 'React', 'hooks']
related: ['five-tips-about-react-hooks', 'how-to-use-props-and-state-in-react']
---

React introduces hooks in version 16.8. Hooks allow us to create functional components with states and side effects.

The `useState` is the simplest hook we can encounter in a React project. This method takes one parameter, the initial value of the state and returns two properties, the value itself and a method to update it.

## Rules of hooks

Like other hooks, there are only two rules to use them. Always use it at the top level of the function, never in loops, conditions and nested functions. You can only use hooks in React functions, never in javascript functions.

## Basic usage of useState

```tsx
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const handleIncrease = () => setCount(count + 1);

  return (
    <div>
      <p>Increase the count to {count + 1}</p>
      <button onClick={handleIncrease} type="button">
        Add
      </button>
    </div>
  );
}

export default App;
```

In the code snippet above, you can see a basic `useState` implementation. The count variable is initially set to 0 with the parameter of the hook. I name the variable `count` and the setter `setCount`. It’s a convention to begin the setter with set and use the variable name after. But it’s not mandatory, do what you want.

I use `setCount` in the function `handleIncrease`. Each time the button is clicked, the variable count is updated and React rerenders the component.

## More advanced use cases

### Asynchronous state changes

Often, our components are more complex and we have several states in the same component. We can update them separately or together.

Take our previous example and add some improvements.

```tsx
import { useState } from 'react';

function App() {
  const [counters, setCount] = useState({ fizz: 0, buzz: 0 });

  const handleIncreaseFizz = () =>
    setCount((prevCounters) => ({ ...prevCounters, fizz: prevCounters.fizz + 1 }));

  const handleIncreaseBuzz = () =>
    setCount((prevCounters) => ({ ...prevCounters, buzz: prevCounters.buzz + 1 }));

  const handleIncreaseAll = () =>
    setCount((prevCounters) => ({ fizz: prevCounters.fizz + 1, buzz: prevCounters.buzz + 1 }));

  return (
    <div>
      <p>
        Fizz: {counters.fizz} Buzz: {counters.buzz}
      </p>
      <button onClick={handleIncreaseFizz} type="button">
        Increase Fizz
      </button>
      <button onClick={handleIncreaseBuzz} type="button">
        Increase Buzz
      </button>
      <button onClick={handleIncreaseAll} type="button">
        Increase all
      </button>
    </div>
  );
}

export default App;
```

In the example above, you can see two things. I don’t use the variable itself and I use a callback inside the `setCount` function instead.

In several cases, it’s better to use a callback if the value depends on the previous or if the setter is asynchronous.

It’s for one reason. You can't guarantee the value of the variable count when you update it with the setter. But with the callback, you’re sure to use the current value.

Try it by replacing the content of the `handleIncreaseBuzz` function with the code below.

```tsx
const handleIncreaseBuzz = () =>
  setTimeout(
    () => setCount((prevCounters) => ({ ...prevCounters, buzz: counters.buzz + 1 })),
    2000
  );
```

If you click on increase Buzz and immediately after increase all, you will have a bad value for Buzz. Because the `setTimeout` schedule the function immediately and execute it later.

`useState` is the lightest hook to managing state in React components.

This post is in a series on the basics of React with Typescript. Check back or follow me on social media to find out what's next.

See you later!
