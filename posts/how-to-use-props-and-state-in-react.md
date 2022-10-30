---
title: 'How to use props and state in React'
date: '2022-03-03'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: 'Props and states are two kinds of variables used in React components.'
tags: ['React', 'Typescript']
---

This blog post relies on React and Typescript, a superset of JavaScript. If you’re a beginner, you can check [this post](https://www.devoreur2code.com/begin-react-with-typescript) to get the prerequisites.

React is a powerful UI library and it works with a tree of components. They can be class-based components or functional components. Since React version 16.8 and hooks, class-based components are less used to the benefit of functional components.

Props and states are two kinds of variables used in React components.

## The common points

Before separating *props* and *state*, let's also identify where they overlap.

- They are plain JS objects
- If they change, React triggers a render update of the component
- They are **deterministic.** The same combination of props and state must generate the same output.

## Props

The term Props is the shortcut for properties.

They are immutable, this means that they can’t change. The functional component receives them as parameters. The change of props triggers a render update of the component.

You can see here, our component _ItemsList_ get props, a list of strings.

```tsx
import { FunctionComponent, useState } from 'react';

interface ItemsListProps {
  list: Array<string>;
}

const ItemsList: FunctionComponent<ItemsListProps> = ({ list }) => {
  console.log('ItemsList rerender');

  return (
    <ul>
      {list.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
};

function App() {
  const [list, setList] = useState(['item1', 'item2', 'item3']);

  const handleClick = () => {
    setList([...list, 'item4']);
  };

  return (
    <div className="App">
      <button onClick={handleClick}>Add</button>
      <ItemsList list={list} />
    </div>
  );
}

export default App;
```

If you click on the button, you add an item to the list and update the props. The component is executed to report the change. You can verify it in the browser’s console.

## State

States are mutable, they can change over time.

They receive a default value when the component mounts. A component manage its states internally. A state passed to a child component becomes props for the child.

If you have a look at the example above, our list in the component App is a state. The method setList can mutate this state.

## Conclusion

Now you know the difference between props and state.

Props are used to pass data to children's components. States are used to manage data into components. This post is in a series on the basics of React with Typescript.

Check back or follow me on social media to find out what's next.

See you later!
