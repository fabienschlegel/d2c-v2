---
title: 'How to useEffect hook in your React components'
date: '2023-01-04'
coverImage: '/assets/blog/cover-images/how-to-useeffect-hook-in-your-react-components-illustration.jpg'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: 'The useEffect hook for React helps you to create side effects in your functional components.'

tags: ['javascript', 'typescript', 'React', 'hooks']
related: ['five-tips-about-react-hooks', 'manage-your-state-with-the-usestate-in-react']
---

React introduces hooks in version 16.8. Hooks allow us to create functional components with states and side effects.

The `useEffect` hook helps you to create side effects in your functional components.

This hook takes a function as the first parameter and an array dependency as the second.

The effect must be in the body of the function. If your effect needs a cleanup, you can return a function to execute it.

## Anatomy of the hook

```tsx
function App() {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(false);

  const handleIncrease = () => setTimer((prevState) => !prevState);

  useEffect(() => {
    let timer1 = setTimeout(() => setCount((prevcount) => prevcount + 1), 2000);

    return () => {
      clearTimeout(timer1);
    };
  }, [timer]);

  return (
    <div>
      <p>count : {count}</p>
      <button onClick={handleIncrease} type="button">
        Launch Timer
      </button>
    </div>
  );
}
```

Here we have an example of the hook. It executes a timer which to increase the count state by 1. We use a timeout function, that’s why we need a cleanup function to clear it.

The array dependency contains the state `timer`. We use it to trigger the `useEffect`.

Each time a state is updated in our component, it rerenders. If `timer` is updated, the function inside the `useEffect` is executed.

Our cleanup function is executed when the component unmounts too, to avoid a memory leak.

## The array dependency

With the array dependency, we can choose when the function inside the hook is executed.

### At each rerender

To execute it at the mount and each rerender, skip the array dependency.

### At mount

With an empty array dependency, your effect will be executed one time only when the component mounts.

### At update

Each time the value in the array dependency is updated and at the mount, the hook will run.

## More examples of useEffect

Now that we've covered the basics of the `useEffect` hook, let's look at a few more examples of how it can be used.

### Fetching data from an API

One common use case for the `useEffect` hook is to fetch data from an API.

```tsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    }

    fetchData();
  }, [userId]);

  if (loading) {
    return <Loading />;
  }

  return <Profile user={user} />;
}
```

We use the `useEffect` hook to fetch the user data for the given `userId` when the component mounts or when the `userId` prop changes.

We set the `loading` state to `true` while the data is being fetched, and then update it to `false` when the data has been received.

This allows us to display a loading indicator while the data is being fetched and then display the user's profile once the data is available.

### Setting up subscriptions

The `useEffect` hook can also be used to set up subscriptions, such as event listeners or web socket connections.

```tsx
function Chat({ userId, onMessage }) {
  useEffect(() => {
    const socket = new WebSocket(`wss://chat.example.com/${userId}`);

    socket.addEventListener('message', onMessage);

    return () => {
      socket.removeEventListener('message', onMessage);
      socket.close();
    };
  }, [userId, onMessage]);

  // ...
}
```

In this example, we use the `useEffect` hook to set up a web socket connection and an event listener for incoming messages.

The `useEffect` hook also includes a cleanup function that removes the event listener and closes the socket connection when the component unmounts.

### Adding event listeners

The `useEffect` hook can also be used to add event listeners to the DOM.

```tsx
function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      Window size: {size.width} x {size.height}
    </div>
  );
}
```

In this example, we use the `useEffect` hook to add a `resize` event to the page. At mount, the variable size is update with the width and the height of the window. The cleanup function removes the event listener when the component unmounts.

## Combining useEffect with other hooks

The `useEffect` hook can be used in combination with other hooks, such as `useState` and `useContext`, to create more complex logic.

For example, you might use the `useState` hook to manage a piece of state that is used to trigger an effect:

```tsx
function Form() {
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (submitting) {
      // perform submission logic
    }
  }, [submitting]);

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button type="submit" disabled={submitting}>
        Submit
      </button>
    </form>
  );
}
```

In this example, we use the `useEffect` hook to perform submission logic when the `submitting` state is `true`. This allows us to disable the submit button and display a loading indicator while the form is being submitted.

You can also use the `useContext` hook to access context values within the `useEffect` hook:

```tsx
function UserList({ userId }) {
  const { users, dispatch } = useContext(UserContext);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(`/api/users?id=${userId}`);
      const data = await response.json();
      dispatch({ type: 'ADD_USERS', users: data });
    }

    fetchUsers();
  }, [userId, dispatch]);

  // ...
}
```

In this example, we use the `useEffect` hook to fetch a list of users based on the `userId` prop and dispatch an action to add the users to the context state.

You can use the `useRef` hook to trigger the content of a useEffect one time only.

```tsx
function App() {
  const trigger = useRef(false);

  useEffect(() => {
    if (trigger.current) return;
    trigger.current = true;

    // your logic here...
  }, []);
  // ...
}
```

In this example, at mount, the content of the `useEffect` will be executed and `trigger` will be updated to true. Now each execution of the `useEffect` will result in an early return.

## Best practices for useEffect

Here are a few best practices to keep in mind when using the `useEffect` hook:

- Be mindful of the performance impact of your effects. Avoid using effects that run too frequently or that have expensive computations.
- Use the array dependency to control when effects are run. This can help avoid unnecessary re-renders and improve performance.
- Use the cleanup function to properly clean up side effects, such as event listeners or network requests. This can help prevent memory leaks.
- Use the `useCallback` hook to memoize functions that are passed as dependencies to the `useEffect` hook. This can help avoid unnecessary re-renders.
- Prefer smaller `useEffect`. They are easier to understand and to maintain.

## Gotchas and things to be aware of

There are a few things to be aware of when using the `useEffect` hook:

- The `useEffect` hook runs asynchronously, which means that you should not rely on its side effects being completed before the next render.
- The `useEffect` hook does not run on the initial render unless you include an empty array dependency. This means that you should not use the `useEffect` hook to set up state that is used in the initial render.
- Be careful not to include values in the array dependency that change too frequently. This can cause the `useEffect` hook to run too frequently, which can impact performance.

I hope this information has been helpful and gives you a better understanding of the `useEffect` hook in React!

This post is in a series on the basics of React with Typescript. Check back or [follow me](https://twitter.com/fabienschlegel) on Twitter to find out what's next.

See you later!
