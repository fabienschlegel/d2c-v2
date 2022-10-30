---
title: 'Conditional Rendering of your React components'
date: '2022-03-08'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien_schlegel.png'
excerpt: "Conditional rendering is a basic feature of the front end apps. It's used to display elements or not depending on the state of the app."
tags: ['React', 'Typescript']
related: ['begin-react-with-typescript']
---

This blog post relies on React and Typescript, a superset of JavaScript. If you’re a beginner, you can check [this post](/begin-react-with-typescript) to get the prerequisites.

UI is made from events, like animation, data calls or changes.

To process all these states, we can use the power of React, a powerful front end library made by Facebook. With our tree of components, we are able to hide or display elements, add or remove CSS classes, etc. React and Typescript gives us a lot of recipes to have control.

I’ll show different examples to render your components or JSX inside components by using conditional rendering.

## Using the IF statement

The IF statement is the most basic conditional rendering you can encounter.

You can use it to display an element if a condition is met. In the code below, our component ItemList will return null if the list is empty.

```typescript
import { FunctionComponent } from 'react';

interface ItemsListProps {
  list: Array<string>;
}

const ItemsList: FunctionComponent<ItemsListProps> = ({ list }) => {
  if (list.length === 0) {
    return null;
  }
  return (
    <ul>
      {list.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
};

function App() {
  const list: Array<string> = [];
  return (
    <div className="App">
      <ItemsList list={list} />
    </div>
  );
}

export default App;
```

## Using the IF/ELSE statement

Unlike the IF statement, the IF/ELSE let you add another statement as an alternative. In the code below, our ItemsList component will return a message about the size of the list.

```typescript
import { FunctionComponent } from 'react';

interface ItemsListProps {
  list: Array<string>;
}

const ItemsList: FunctionComponent<ItemsListProps> = ({ list }) => {
  let listLength;

  if (list.length === 0) {
    listLength = 'No items';
  } else {
    listLength = 'We have at least one item';
  }

  return (
    <>
      <ul>
        {list.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <p>{listLength}</p>
    </>
  );
};

function App() {
  const list: Array<string> = [];
  return (
    <div className="App">
      <ItemsList list={list} />
    </div>
  );
}

export default App;
```

## Using the ternary operator

The advantage of using the ternary operator is to use it on JSX, unlike IF/ELSE statement. We can take the last example and turn it into a ternary expression.

```typescript
import { FunctionComponent } from 'react';

interface ItemsListProps {
  list: Array<string>;
}

const ItemsList: FunctionComponent<ItemsListProps> = ({ list }) => {
  return (
    <>
      <ul>
        {list.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <p>{list.length === 0 ? 'No items' : 'We have at least one item'}</p>
    </>
  );
};

function App() {
  const list: Array<string> = [];
  return (
    <div className="App">
      <ItemsList list={list} />
    </div>
  );
}

export default App;
```

## Using the short circuit operator

In Javascript, an expression is evaluated from left to right. If the left side of the expression is false, the remaining conditions will not affect the result.

Look at the code below to see the short circuit in action.

```typescript
import { FunctionComponent } from 'react';

interface ItemsListProps {
  list: Array<string>;
}

const ItemsList: FunctionComponent<ItemsListProps> = ({ list }) => {
  return (
    <ul>
      {list.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
};

function App() {
  const list: Array<string> = [];
  return <div className="App">{list.length > 0 && <ItemsList list={list} />}</div>;
}

export default App;
```

In this example, you can use the ternary operator instead by replacing the second part with null, like this.

```typescript
<div className="App">{list.length > 0 ? <ItemsList list={list} /> : null}</div>
```

With the short circuit, your expression is more concise.

## Using the switch/case

The switch/case statement takes a variable as the switch and gives a result for each case you provides. The default is a special case. It’s used as a fallback.

The break statement is important, it stops the path into the switch.

```typescript
import { FunctionComponent } from 'react';

interface ItemsListProps {
  list: Array<string>;
}

const ItemsList: FunctionComponent<ItemsListProps> = ({ list }) => {
  let listLength;
  switch (list.length) {
    case 0:
      listLength = 'no items';
      break;
    case 1:
      listLength = '1 item';
      break;
    default:
      listLength = `${list.length} items`;
      break;
  }
  return (
    <>
      <ul>
        {list.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <p>{listLength}</p>
    </>
  );
};

function App() {
  const list: Array<string> = ['item 1', 'item 2', 'item 3'];
  return (
    <div className="App">
      <ItemsList list={list} />
    </div>
  );
}

export default App;
```

A switch/case can’t be used in JSX except with a self-invoking function like this.

```typescript
<p>
  {() => {
    let listLength;
    switch (list.length) {
      case 0:
        listLength = 'no items';
        break;
      case 1:
        listLength = '1 item';
        break;
      default:
        listLength = `${list.length} items`;
        break;
    }
    return listLength;
  }}
</p>
```

## Conclusion

You will use conditional rendering very often when building React apps. Think before coding to choose the best approach for your rendering.

This post is in a series on the basics of React with Typescript. Check back or follow me on social media to find out what's next.

See you later!
