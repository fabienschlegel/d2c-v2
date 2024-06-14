---
title: 'Managing a data store: combining the Context API and Redux Toolkit'
pageTitle: 'Managing a React context with Redux Toolkit'
date: '2024-06-14'
author:
  name: 'Fabien Schlegel'
  avatar: '/assets/blog/authors/fabien-schlegel.webp'
coverImage: '/assets/blog/cover-images/combine-context-api-and-redux-toolkit-illustration.webp'
excerpt: 'Discover how to combine the Context API and Redux Toolkit for efficient and flexible data management in your React applications. Learn how to configure, integrate and optimize these tools for more maintainable, high-performance applications.'
tags: ['typescript', 'react']
related: ['typescript-for-react-development', 'begin-react-with-typescript']
---

In the development of React applications, data management is a central issue. We're constantly looking for ways to simplify and optimize this management to make our applications more robust and maintainable.

Historically, Redux has been the tool of choice for this task, offering a clear and predictable approach to global data management. But it is too complex and verbose for medium-sized projects.

This is where the combination of React's Context API and Redux Toolkit comes in. This API, introduced in React 16.3, makes it easy to share data between different components without having to explicitly go through properties. While useful, it can become difficult to manage when dealing with complex data. On the other hand, Redux Toolkit is a Redux overlay that greatly simplifies its configuration and use, while retaining the advantages of Redux.

By combining these two tools, we can take advantage of the simplicity and flexibility of the Context API and benefit from the advantages of Redux Toolkit. This approach not only reduces code complexity, but also improves application performance.

## What is the Context API?

The Context API consists mainly of three elements:

- **Context**: An object created with `createContext()` which contains two components: `Provider` and `Consumer`.
- **Provider**: A React component that supplies data to all child components. The `Provider` accepts a `value` property which contains the data to be shared.
- **Consumer**: A React component that consumes the data provided by the `Provider`. It uses a rendering function to access the data.

Here's a simple example of how to create and use a context:

```tsx
import React, { createContext, useContext } from 'react';

// Context creation
const ThemeContext = createContext();

const App = () => {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
};

const Toolbar = () => {
  return (
    <div>
      <ThemedButton />
    </div>
  );
};

const ThemedButton = () => {
  const theme = useContext(ThemeContext);
  return <button style={{ background: theme === 'dark' ? '#333' : '#FFF' }}>Theme Button</button>;
};
```

In this example, the `ThemeContext.Provider` provides the value `dark` to all its child components, and the `ThemedButton` component consumes this value using the `useContext` hook.

### Common use cases

The Context API is ideal for :

- **Theming**: Sharing themes (dark, light) across the application.
- **Authentication**: Share user authentication status and session information.
- **Global settings**: Manage global application settings and preferences.
- **Local settings**: Manage the status and data of a subset of the application.

### Advantages and disadvantages of the Context API

**Advantages:**

- **Simplicity**: Easy to understand and use for simple states.
- **Reduced "prop drilling"** : Avoids the need to manually pass properties through multiple levels of components.
- **Native integration**: No need to install external libraries, everything is included in React.

**Disadvantages:**

- **Performance**: Consumer components are rendered every time the context changes, which can impact performance if overused.
- **Complex states**: Managing complex states with actions and reducers can become difficult.

## Redux Toolkit

Redux Toolkit (RTK) is an official Redux library that simplifies the process of configuring and using Redux in React applications. Launched in response to criticism of Redux's complexity and verbosity, Redux Toolkit provides abstractions and tools to make using Redux more accessible and efficient.

### The main methods

Redux Toolkit is designed to be the default best practice for global state management with Redux. It brings together several utilities to simplify common tasks such as store configuration, reducer creation, action management and much more. Here are the main components of Redux Toolkit:

- **`configureStore`**: A function that automatically configures the store with good default practices (such as adding Redux Thunk middleware and enabling Redux DevTools strict mode).
- **`createSlice`**: A function that simplifies the creation of slices, automatically combining reducers and actions.
- **`createAsyncThunk`**: A utility for handling asynchronous actions, often used for API calls.
- **`createEntityAdapter`**: A tool for normalizing and managing entity collections in state.

### It's become a standard

Redux Toolkit has become the standard for several reasons:

- **Simplification**: Reduces boilerplate and simplifies Redux configuration.
- **Built-in best practices**: It applies best practices by default, such as using immutability with immer and managing side effects with Redux Thunk.
- **Easy maintenance**: Slices and thunks make Redux code more modular and easier to maintain.
- **Performance**: By integrating immer, Redux Toolkit enables efficient immutable updates without compromising performance.

### Benefits

**Simplicity and boilerplate reduction:** Redux Toolkit dramatically reduces the amount of code needed to configure Redux, thanks to functions like `configureStore` and `createSlice`.

**Modularity and maintainability:** By encouraging a modular code structure, RTK facilitates the management and maintenance of large Redux projects.

**Side-effect management:** With tools like `createAsyncThunk`, RTK simplifies the management of asynchronous actions, making code more readable and easier to understand.

**Interoperability:** RTK is designed to work seamlessly with existing tools and libraries in the React ecosystem, such as the Context API.

Here's a simple example of configuring the store with Redux Toolkit:

```tsx
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Slice creation
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

// Extract actions and reducer
const { actions, reducer } = counterSlice;

// Configure store
const store = configureStore({
  reducer: {
    counter: reducer,
  },
});

// Export actions to use in components
export const { increment, decrement } = actions;
export default store;
```

With this code, we set up a Redux store with a simple slice to manage a counter. Redux Toolkit has eliminated a lot of boilerplate, making the process simpler and more straightforward.

## Why use Context API with Redux Toolkit?

Combining React's Context API with Redux Toolkit may seem redundant at first glance, given that both tools have overlapping functionality when it comes to state management. Integrating them can offer a range of benefits that improve the simplicity, performance and maintainability of your React applications.

### Simplified configuration

One of the main advantages of the Redux Toolkit is its ability to simplify Redux configuration. However, by using the Context API to provide a data store for your components, you can further reduce the boilerplate and increase the flexibility of your application. Instead of setting up a global store with Redux that will contain all our data, we'll be able to slice it up into several contexts that will have a lifecycle linked to the components that consume them.

### Reducing code complexity

By using the Context API with Redux Toolkit, you can leverage the strengths of both. The Context API is excellent for sharing simple, static data, while Redux Toolkit efficiently handles more complex state and update logic. This combination separates the concerns: the Context API for simple states and parameters, and Redux Toolkit for complex functionality, thus reducing overall code complexity.

### Example scenario

Consider an application with a task management module. Rather than managing this data with the global store, we're going to delegate this management to a local store, closer to our components.

We can use a context, a provider and a custom hook to bring tasks and CRUD methods to the components that consume them.

## Configuring the Context API with Redux Toolkit

Configuring the Context API with Redux Toolkit in a React application allows you to benefit from the simplicity of the Context API for simple states and the power of Redux Toolkit for complex states. In this section, we'll review the steps required to set up this configuration.

### Setting up the initial project

Start by creating a new React application if you don't already have one. You can use `viteJS` for this:

```bash
yarn create vite task-manager --template react-ts
cd task-manager
yarn
yarn dev
```

### Installing the necessary dependencies

Before you start, make sure you've installed the necessary libraries. All you need is the Redux Toolkit. You can install them via npm or yarn :

```bash
npm install @reduxjs/toolkit
```

ou

```bash
yarn add @reduxjs/toolkit
```

### Setting up the data store with Redux Toolkit

Next, we'll configure the context using Redux Toolkit. Create a `TasksContext.ts` file and configure the datastore to manage tasks:

```tsx
import { Dispatch, createContext } from 'react';

import { EntityState, PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { Task, TaskEntity, TasksState } from '../models/Tasks';

interface TasksContextStateType {
  tasks: EntityState<Task, string>;
}

type TasksContextPayloadActions =
  | PayloadAction<string>
  | PayloadAction<{ id: string; name: string }>
  | PayloadAction<{ id: string; taskState: TasksState }>;

const taskAdapter = createEntityAdapter<Task>();

export const { selectAll: selectAllTasks, selectById: selectTaskById } =
  taskAdapter.getSelectors<TasksContextStateType>((state) => state.tasks);

export const initialState: TasksContextStateType = {
  tasks: taskAdapter.getInitialState(),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<string>) {
      const entity = new TaskEntity();
      entity.create(action.payload);

      taskAdapter.addOne(state.tasks, entity.task);
    },
    updateTaskName(state, action: PayloadAction<{ id: string; name: string }>) {
      const { id, name } = action.payload;

      taskAdapter.updateOne(state.tasks, { id, changes: { name } });
    },
    updateTaskState(state, action: PayloadAction<{ id: string; taskState: TasksState }>) {
      const { id, taskState } = action.payload;

      taskAdapter.updateOne(state.tasks, { id, changes: { state: taskState } });
    },
    deleteTask(state, action: PayloadAction<string>) {
      taskAdapter.removeOne(state.tasks, action.payload);
    },
  },
});

export const { addTask, updateTaskName, updateTaskState, deleteTask } = tasksSlice.actions;

export const { reducer } = tasksSlice;

export const TasksContext = createContext<{
  state: TasksContextStateType;
  dispatch: Dispatch<TasksContextPayloadActions>;
}>({
  state: initialState,
  dispatch: () => null,
});
```

The `createSlice` method lets us create our actions and our reducer to modify the data in our context.

The `createContext` method will generate the React context with `state`, our data store, on one side and dispatch, the method for modifying our data, on the other.

### Setting up the context

Let's start with the context provider. Create a `TasksProvider.tsx` file and add the following elements.

```tsx
import { FunctionComponent, ReactNode, useReducer } from 'react';

import { reducer, initialState, TasksContext } from './TasksContext';

interface TasksProviderProps {
  children: ReactNode;
}

const TasksProvider: FunctionComponent<TasksProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <TasksContext.Provider value={{ state, dispatch }}>{children}</TasksContext.Provider>;
};

export default TasksProvider;
```

The `useReducer` hook will contain our reducer and the initial state of our data store. It returns the current state of our data and the `dispatch` update method.

Next, let's add a custom hook `useTasks.ts` which will allow us to use the context.

```tsx
import { useContext } from 'react';

import {
  TasksContext,
  addTask,
  deleteTask,
  selectAllTasks,
  updateTaskName,
  updateTaskState,
} from './TasksContext';

import { TasksState } from '../models/Tasks';

function useTasks() {
  const { state, dispatch } = useContext(TasksContext);

  const tasks = selectAllTasks(state);

  function add(name: string) {
    dispatch(addTask(name));
  }

  function updateName(id: string, name: string) {
    dispatch(updateTaskName({ id, name }));
  }

  function updateState(id: string, taskState: TasksState) {
    dispatch(updateTaskState({ id, taskState }));
  }

  function remove(id: string) {
    dispatch(deleteTask(id));
  }

  return { tasks, add, updateName, updateState, remove };
}

export default useTasks;
```

This hook provides us with the tasks and all the methods we need to modify them.

### Integration into the application

Now we're going to integrate the context into our application. Create or modify the `App.ts` file to use the :

```tsx
import TasksList from './components/TasksList';
import TasksProvider from './contexts/TasksProvider';

function App() {
  return (
    <TasksProvider>
      <TasksList />
    </TasksProvider>
  );
}

export default App;
```

### Using context and store in components

Finally, let's create a `TaskList.tsx` component that uses context for tasks:

```tsx
import { FunctionComponent } from 'react';
import useTasks from '../contexts/useTasks';
import TaskItem from './TaskItem';

interface TasksListProps {}

const TasksList: FunctionComponent<TasksListProps> = () => {
  const { tasks, add, updateName, remove } = useTasks();

  const isCreatingNewTask = tasks.find((t) => t.name.length === 0);

  return (
    <div>
      <ul>
        {tasks.map((t) => (
          <TaskItem key={t.id} task={t} onEdit={updateName} onDelete={remove} />
        ))}
      </ul>
      {!isCreatingNewTask && (
        <button type="button" onClick={() => add('')}>
          Add Task
        </button>
      )}
    </div>
  );
};

export default TasksList;
```

## Conclusion

The combination of the Context API and Redux Toolkit offers a flexible and efficient solution for managing state in React applications.

This hybrid approach allows you to benefit from the simplicity of the Context API while harnessing the power of Redux Toolkit for data state. In comparison, pure Redux is a robust solution for very complex applications, but can introduce unnecessary complexity for simpler states. Depending on the complexity of your application and the specific needs of your project, one or the other approach may be more appropriate.

### Summary of benefits

1. **Simplicity and Boilerplate Reduction:** Redux Toolkit, with its `createSlice` method, considerably simplifies the creation of actions and reducers, reducing the verbose code typical of pure Redux. Integration with the Context API for simple states keeps code clean and readable.
2. **Efficient state management:** Using the Context API and Redux Toolkit, you get the best of both worlds. This allows you to efficiently manage a variety of scenarios within the same application.
3. **Optimized performance:** Although the Context API can cause unnecessary rendering if misused, the hybrid approach limits its use to states that do not change frequently, minimizing performance problems.
4. **Ease of learning and use:** Redux Toolkit softens the Redux learning curve by automating many complex aspects. The Context API, on the other hand, is intuitive and quick to learn, making this combination particularly attractive to developers of all levels.

### Suitable use cases

- Medium to large-scale applications:\*\* This method is ideal for applications requiring complex state management for some parts and simple states for others.
- Projects requiring scalability:\*\* With a flexible, modular architecture, this approach facilitates code evolution and maintenance as the application grows.
- Collaborative development:\*\* The readability and maintainability of code produced by this approach are particularly beneficial in diverse development teams, where several developers work together.

### Going further

If you want to go further, you should explore combinations of this hybrid approach with other state management or code structure tools, such as Recoil, Zustand or MobX, to identify what best suits your specific needs.

### Final conclusion

In conclusion, the integration of the Context API with Redux Toolkit offers a flexible, powerful and accessible solution for global state management in React applications.

This hybrid approach represents a particularly effective option if you're looking to create responsive, maintainable applications.
